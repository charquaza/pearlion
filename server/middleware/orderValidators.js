const { body, param, validationResult } = require('express-validator');
const db = require('../models/index');

function checkValidation(req, res, next) {
   var validationErrors = validationResult(req);

   if (!validationErrors.isEmpty()) {
      let errorMessageList = validationErrors.array().map(err => err.msg);
      return res.status(400).json({ errors: errorMessageList });
   } else {
      return next();
   }
}

exports.checkIdParam = [
   param('orderId').isString().withMessage('Invalid value for orderId').bail()
      .trim().notEmpty().withMessage('orderId cannot be blank'),

   checkValidation
];

exports.create = [
   body('shippingCost')
      .custom((value) => {
         if (!Number.isInteger(value)) {
            throw new Error('Invalid value for Shipping Cost');
         }
         if (value < 0) {
            throw new Error('Shipping Cost cannot be less than zero');
         }
         return true;
      }),
   body('tax')
      .custom((value) => {
         if (!Number.isInteger(value)) {
            throw new Error('Invalid value for Tax');
         }
         if (value < 0) {
            throw new Error('Tax cannot be less than zero');
         }
         return true;
      }),
   body('fulfillmentStatus')
      .isString().withMessage('Invalid value for Fulfillment Status').bail()
      .trim().custom((value) => {
         const allowedValues = [ 'processing', 'shipped', 'delivered' ];
         return allowedValues.includes(value); 
      }).withMessage('Invalid value for Fulfillment Status'),
   body('deliveryDate').optional({ values: 'falsy' })
      .isString().withMessage('Invalid value for Delivery Date').bail()
      .trim().escape().notEmpty().withMessage('Delivery Date cannot be blank')
      .isISO8601().withMessage('Delivery Date must be a valid ISO 8601 date'),
   body('returnStatus').optional({ values: 'falsy' })
      .isString().withMessage('Invalid value for Return Status').bail()
      .trim().custom((value) => {
         const allowedValues = [ 'started', 'processing', 'complete' ];
         return allowedValues.includes(value); 
      }).withMessage('Invalid value for Return Status'),
   body('productsPurchased')
      .isArray().withMessage('Invalid value for Products Purchased').bail()
      .custom(async (productsPurchased) => {
         if (productsPurchased.length === 0) {
            throw new Error('Products Purchased must contain at least one product');
         }

         for (let i = 0; i < productsPurchased.length; i++) {
            let purchaseData = productsPurchased[i];

            try {
               var product = await db.Product.findByPk(purchaseData.productId);
            } catch(err) {
               throw new Error('Error in confirming product details. Please try again later, or report the issue.');
            }

            if (!product || product.status !== 'sale') {
               throw new Error('Products Purchased contains a product that isn\'t for sale');
            }

            if (
               !Number.isInteger(purchaseData.unitPrice) ||
               purchaseData.quantityPurchased <= 0
            ) {
               throw new Error('Products Purchased contains an invalid unit price');
            }

            if (
               !Number.isInteger(purchaseData.quantityPurchased) ||
               purchaseData.quantityPurchased <= 0
            ) {
               throw new Error('Products Purchased contains an invalid purchase quantity');
            }
         }

         return true;
      }),
   
   checkValidation
];

exports.update = [
   body('shippingCost')
      .custom((value) => {
         if (!Number.isInteger(value)) {
            throw new Error('Invalid value for Shipping Cost');
         }
         if (value < 0) {
            throw new Error('Shipping Cost cannot be less than zero');
         }
         return true;
      }),
   body('tax')
      .custom((value) => {
         if (!Number.isInteger(value)) {
            throw new Error('Invalid value for Tax');
         }
         if (value < 0) {
            throw new Error('Tax cannot be less than zero');
         }
         return true;
      }),
   body('fulfillmentStatus')
      .isString().withMessage('Invalid value for Fulfillment Status').bail()
      .trim().custom((value) => {
         const allowedValues = [ 'processing', 'shipped', 'delivered' ];
         return allowedValues.includes(value); 
      }).withMessage('Invalid value for Fulfillment Status'),
   body('deliveryDate').optional({ values: 'falsy' })
      .isString().withMessage('Invalid value for Delivery Date').bail()
      .trim().escape().notEmpty().withMessage('Delivery Date cannot be blank')
      .isISO8601().withMessage('Delivery Date must be a valid ISO 8601 date'),
   body('returnStatus').optional({ values: 'falsy' })
      .isString().withMessage('Invalid value for Return Status').bail()
      .trim().custom((value) => {
         const allowedValues = [ 'started', 'processing', 'complete' ];
         return allowedValues.includes(value); 
      }).withMessage('Invalid value for Return Status'),
   
   checkValidation
];