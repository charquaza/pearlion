const db = require('../models/index');
const orderValidators = require('../middleware/orderValidators');

exports.getAll = [
   async function checkPermissions(req, res, next) {
      if (!req.user) {
         return res.status(404).json({ errors: ['Order not found'] });
      }

      return next();
   },

   async function (req, res, next) {
      try {
         let orderList = req.user.privilege === 'admin' 
            ? await db.Order.findAll({ raw: true })
            : await db.Order.findAll({ where: { client: req.user.id }, raw: true });
         res.json({ data: orderList });
      } catch (err) {
         return next(err);
      }
   }
];

exports.getById = [
   async function checkPermissions(req, res, next) {
      if (!req.user) {
         return res.status(404).json({ errors: ['Order not found'] });
      }

      return next();
   },

   orderValidators.checkIdParam,

   async function (req, res, next) {
      try {
         let orderData = await db.Order.findByPk(req.params.orderId);

         if (
            orderData === null || 
            req.user.privilege !== 'admin' && orderData.client !== req.user.id
         ) {
            res.status(404).json({ errors: ['Order not found'] });
         } else {
            res.json({ data: orderData.get() });
         }
      } catch (err) {
         return next(err);
      }
   }
];

exports.create = [
   async function checkPermissions(req, res, next) {
      if (!req.user) {
         return res.status(404).json({ errors: ['Order not found'] });
      }

      return next();
   },

   orderValidators.create,

   async function (req, res, next) {
      try {
         //perform order creation and purchase creation in a transaction
         const result = await db.sequelize.transaction(async (t) => {
            let newOrder = await db.Order.create({
               client: req.user.id,
               purchaseDate: Date.now(),
               shippingCost: req.body.shippingCost,
               tax: req.body.tax,
               fulfillmentStatus: req.body.fulfillmentStatus,
               deliveryDate: req.body.deliveryDate,
               returnStatus: req.body.returnStatus
            }, { transaction: t });

            //create purchase entries associated with order
            await Promise.all(req.body.productsPurchased.map(purchaseData => {
               return db.Purchase.create({
                  order: newOrder.id,
                  product: purchaseData.productId,
                  unitPrice: purchaseData.unitPrice,
                  quantityPurchased: purchaseData.quantityPurchased
               }, { transaction: t });
            }));

            return newOrder;
         });

         res.json({ data: result.get() });
      } catch (err) {
         return next(err);
      }
   }
];

exports.update = [
   orderValidators.checkIdParam,

   async function checkPermissions(req, res, next) {
      if (!req.user) {
         return res.status(404).json({ errors: ['Order not found'] });
      }

      if (req.user.privilege !== 'admin') {
         return res.status(403).json({ errors: ['Not allowed'] });
      }

      return next();
   },
   
   orderValidators.update,

   async function (req, res, next) {
      try {
         let fieldsToUpdate = {
            purchaseDate: Date.now(),
            shippingCost: req.body.shippingCost,
            tax: req.body.tax,
            purchaseTotal: req.body.purchaseTotal,
            fulfillmentStatus: req.body.fulfillmentStatus,
            deliveryDate: req.body.deliveryDate,
            returnStatus: req.body.returnStatus
         };

         let orderToUpdate = await db.Order.findByPk(req.params.orderId);

         if (orderToUpdate === null) {
            res.status(404).json({ errors: ['Order not found'] });
         } else {
            let updatedOrder = await orderToUpdate.update(fieldsToUpdate);
            res.json({ data: updatedOrder.get() });
         }
      } catch (err) {
         return next(err);
      }
   }
];

exports.delete = [
   async function checkPermissions(req, res, next) {
      if (!req.user) {
         return res.status(404).json({ errors: ['Order not found'] });
      }

      if (req.user.privilege !== 'admin') {
         return res.status(403).json({ errors: ['Not allowed'] });
      }

      return next();
   },

   orderValidators.checkIdParam,

   async function (req, res, next) {
      try {
         let orderToDelete = await db.Order.findByPk(req.params.orderId);

         if (orderToDelete === null) {
            res.status(404).json({ errors: ['Order not found'] });
         } else {
            await orderToDelete.destroy();
            res.json({ data: { msg: 'Order delete successful' } });   
         }
      } catch (err) {
         return next(err);
      }
   }
];