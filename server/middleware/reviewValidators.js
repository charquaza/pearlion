const { body, param, query, validationResult } = require('express-validator');
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
   param('reviewId').isString().withMessage('Invalid value for reviewId').bail()
      .trim().notEmpty().withMessage('reviewId cannot be blank'),

   checkValidation
];

exports.checkProductIdQuery = [
   query('productId').optional({ values: 'falsy' })
      .isString().withMessage('Invalid value for productId').bail()
      .trim(),

   checkValidation
];

exports.checkImagesQuery = [
   query('images').optional({ values: 'null' })
      .isString().withMessage('Invalid value for Images').bail()
      .trim().custom(value => {
         const allowedValues = [
            'true',
            'false'
         ];
         return allowedValues.includes(value); 
      }).withMessage('Invalid value for Images'),

   checkValidation
];

exports.create = [
   body('productId')
      .custom(async (productId) => {
         try {
            var product = await db.Product.findByPk(productId);
         } catch(err) {
            throw new Error('Error in confirming product details. Please try again later, or report the issue.');
         }

         if (product === null) {
            throw new Error('Cannot leave a review for this product');
         }
      }).bail({ level: 'request' }),
   body('rating')
      .custom((value) => {
         const rating = Number(value);

         if (!Number.isInteger(rating)) {
            throw new Error('Invalid value for Rating');
         }
         if (rating < 1) {
            throw new Error('Rating cannot be less than 1');
         }
         if (rating > 5) {
            throw new Error('Rating cannot be greater than 5');
         }
         return true;
      }),
   body('review').isString().withMessage('Invalid value for Review').bail()
      .trim().notEmpty().withMessage('Review cannot be blank')
      .escape(),
   
   checkValidation
];

exports.update = [
   body('productId')
      .custom(async (productId) => {
         try {
            var product = await db.Product.findByPk(productId);
         } catch(err) {
            throw new Error('Error in confirming product details. Please try again later, or report the issue.');
         }

         if (product === null) {
            throw new Error('Cannot leave a review for this product');
         }
      }).bail({ level: 'request' }),
   body('rating')
      .custom((value) => {
         const rating = Number(value);

         if (!Number.isInteger(rating)) {
            throw new Error('Invalid value for Rating');
         }
         if (rating < 1) {
            throw new Error('Rating cannot be less than 1');
         }
         if (rating > 5) {
            throw new Error('Rating cannot be greater than 5');
         }
         return true;
      }),
   body('review').isString().withMessage('Invalid value for Review').bail()
      .trim().notEmpty().withMessage('Review cannot be blank')
      .escape(),
   body('deletedImages').optional({ values: 'falsy' })
      .custom((value) => {
         const parsedValue = JSON.parse(value);
         return Array.isArray(parsedValue) && parsedValue.length > 0;
      }).withMessage('Invalid value for deletedImages'),

   checkValidation
];