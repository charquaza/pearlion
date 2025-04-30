const express = require('express');
const { Op } = require('sequelize');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const db = require('../models/index');
const orderValidators = require('../middleware/orderValidators');

exports.checkout = [
   async function (req, res, next) {   
      try {
         const customerId = req.user ? req.user.id : process.env.GUEST_USER_ID; //guest user id
         const totalBeforeTax = 100 * req.body.reduce((sum, item) => {
            return sum + (item.unitPrice * item.quantityPurchased);
         }, 0);
         const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

         let taxCalculation;
         try {
            taxCalculation = await stripe.tax.calculations.create({
               currency: 'usd',
               line_items: req.body.map(item => { 
                  return { 
                     amount: 100 * item.unitPrice * item.quantityPurchased, reference: item.product 
                  };
               }),
               customer_details: {
                  ip_address: ipAddress
               }
            });
         } catch (e) {
            console.log('Tax could not be calculated based on customer IP address');
         }

         //store order details in db to reference in webhook after completing checkout
         const order = await db.sequelize.transaction(async (t) => {
            const order = await db.Order.create({
               client: customerId,
               purchaseDate: Date.now(),
               shippingCost: 0,
               tax: taxCalculation ? taxCalculation.tax_amount_exclusive : 0,
               fulfillmentStatus: 'in-checkout'
            }, { transaction: t });

            //create Purchase entries for Order
            await Promise.all(req.body.map(product => {
               return db.Purchase.create({
                  order: order.id,
                  product: product.product,
                  unitPrice: Number(product.unitPrice),
                  quantityPurchased: Number(product.quantityPurchased)
               }, { transaction: t });
            }));

            return order;
         });

         const paymentIntent = await stripe.paymentIntents.create({
            amount: (taxCalculation && taxCalculation.amount_total) || totalBeforeTax,
            currency: 'usd',
            metadata: {
               customerId,
               orderId: order.id,
               ...(taxCalculation && {
                  taxAmount: taxCalculation.tax_amount_exclusive,
                  taxCalcId: taxCalculation.id
               })
            },
            automatic_payment_methods: {
               enabled: true,
            }
         });
   
         res.json({ data: 
            {
               clientSecret: paymentIntent.client_secret,
               paymentIntentId: paymentIntent.id,
               taxEstimate: paymentIntent.metadata.taxAmount
            }
         });
      } catch (err) {
         console.log(err);
         return next(err);
      }
   }
];

exports.tax = [
   async function (req, res, next) {   
      try {
         const paymentIntent = await stripe.paymentIntents.retrieve(req.body.paymentIntentId);

         const purchaseData = await db.Purchase.findAll({
            where: { order: paymentIntent.metadata.orderId },
            raw: true
         });

         const newTaxCalc = await stripe.tax.calculations.create({
            currency: 'usd',
            line_items: purchaseData.map(purchase => {
               return { 
                  amount: 100 * purchase.unitPrice * purchase.quantityPurchased, 
                  reference: purchase.product 
               };
            }),
            customer_details: {
               address: req.body.address,
               address_source: 'shipping'
            }
         });
 
         const updatedPaymentIntent = await stripe.paymentIntents.update(
            req.body.paymentIntentId,
            {
               amount: newTaxCalc.amount_total,
               metadata: {
                  ...paymentIntent.metadata,
                     taxAmount: newTaxCalc.tax_amount_exclusive,
                     taxCalcId: newTaxCalc.id
               }
            }
         );

         res.json({ data: 
            {
               taxAmount: updatedPaymentIntent.metadata.taxAmount
            }
         });
      } catch (err) {
         console.log(err);
         return next(err);
      }
   }
];

exports.webhook = [
   express.raw({ type: 'application/json' }),

   async function (req, res, next) {
      let event = req.body;
      
      const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
      const signature = req.headers['stripe-signature'];

      try {
         event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            endpointSecret
         );
      } catch (err) {
         console.log(`⚠️  Webhook signature verification failed.`, err.message);
         return res.sendStatus(400);
      }

      const paymentIntent = event.data.object;

      switch (event.type) {
         case 'payment_intent.created':
            //delete orders abandoned in checkout
            try {
               await db.Order.destroy({ where: {
                  fulfillmentStatus: 'in-checkout',
                  purchaseDate: { [Op.lt]: Date.now() - 1000*60*60*24  } //older than 1 day
               } });   
            } catch (err) {
               console.log(err);
            }

            break;
         case 'payment_intent.succeeded':
            async function saveOrderToDB(paymentIntent) {
               try {
                  const [ countOrdersUpdated ] = await db.Order.update(
                     {
                        paymentApiId: paymentIntent.id,
                        tax: paymentIntent.metadata.taxAmount,
                        fulfillmentStatus: 'delivered',
                        deliveryDate: Date.now()
                     }, 
                     { where: { id: paymentIntent.metadata.orderId } }
                  );

                  if (countOrdersUpdated !== 1) {
                     console.log('ERROR: countOrdersUpdated = ' + countOrdersUpdated);
                  }
               } catch (err) {
                  console.log(err);
               }
            }

            async function createTaxTransaction(paymentIntent) {
               const transaction = await stripe.tax.transactions.createFromCalculation({
                  calculation: paymentIntent.metadata.taxCalcId,
                  reference: paymentIntent.id,
                  expand: ['line_items'],
               });

               await stripe.paymentIntents.update(
                  paymentIntent.id,
                  {
                     metadata: {
                        ...paymentIntent.metadata,
                        taxTransactionId: transaction.id
                     }
                  }
               );
            }

            saveOrderToDB(paymentIntent);
            createTaxTransaction(paymentIntent);

            break;
         default:
            console.log(`Unhandled event type ${event.type}.`);
      }
      
      //Return 200 response to acknowledge receipt of the event
      res.send();
   }
];

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
            ? 
               await db.Order.findAll({
                  include: [
                     {
                        model: db.Product,
                        order: [[ 'name', 'ASC' ]]
                     }
                  ],
                  order: [ ['purchaseDate', 'DESC'] ]    
               })
            : 
               await db.Order.findAll({ 
                  where: { 
                     client: req.user.id,
                     fulfillmentStatus: { [Op.not]: 'in-checkout' }
                  },
                  include: [
                     {
                        model: db.Product,
                        order: [[ 'name', 'ASC' ]]
                     }
                  ],
                  order: [ ['purchaseDate', 'DESC'] ]    
               });
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
         let orderData = await db.Order.findByPk(req.params.orderId, 
            { 
               include: [
                  {
                     model: db.Product,
                     order: [[ 'name', 'ASC' ]]
                  }
               ]
            }
         );

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
               paymentApiId: req.body.paymentApiId,
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
            let updatedOrder = await orderToUpdate.update(fieldsToUpdate, { returning: true });
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