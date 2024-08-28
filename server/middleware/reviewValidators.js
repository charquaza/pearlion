const { body, param, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const db = require('../models/index');

async function checkValidation(req, res, next) {
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
      }),
   body('rating')
      .custom((value) => {
         if (!Number.isInteger(value)) {
            throw new Error('Invalid value for Rating');
         }
         if (value < 1) {
            throw new Error('Rating cannot be less than 1');
         }
         if (value > 5) {
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
   body('rating')
      .custom((value) => {
         if (!Number.isInteger(value)) {
            throw new Error('Invalid value for Rating');
         }
         if (value < 1) {
            throw new Error('Rating cannot be less than 1');
         }
         if (value > 5) {
            throw new Error('Rating cannot be greater than 5');
         }
         return true;
      }),
   body('review').isString().withMessage('Invalid value for Review').bail()
      .trim().notEmpty().withMessage('Review cannot be blank')
      .escape(),
   
   checkValidation
];