const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const db = require('../models/index');
const orderValidators = require('../middleware/orderValidators');

exports.getAll = [
   function checkPermissions(req, res, next) {
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
   function checkPermissions(req, res, next) {
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
            res.json({ data: orderData.get({ plain: true }) });
         }
      } catch (err) {
         return next(err);
      }
   }
];

exports.checkout = [
   async function (req, res, next) {   
      try {
         const totalAmount = req.body.products.reduce((sum, product) => sum + product.amount, 0);

         const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'usd',
            automatic_payment_methods: {
               enabled: true,
            }
         });
      
         res.json({ data: 
            {
               clientSecret: paymentIntent.client_secret,
               // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
               dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`
            }
         });
      } catch (err) {
         return next(err);
      }
   }
];

exports.create = [
   function checkPermissions(req, res, next) {
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

         res.json({ data: result.get({ plain: true }) });
      } catch (err) {
         return next(err);
      }
   }
];

exports.update = [
   orderValidators.checkIdParam,

   function checkPermissions(req, res, next) {
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
            res.json({ data: updatedOrder.get({ plain: true }) });
         }
      } catch (err) {
         return next(err);
      }
   }
];

exports.delete = [
   function checkPermissions(req, res, next) {
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