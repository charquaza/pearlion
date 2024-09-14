const { body, param, validationResult } = require('express-validator');
const { Op } = require("sequelize");
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
   param('productId').isString().withMessage('Invalid value for productId').bail()
      .trim().notEmpty().withMessage('productId cannot be blank'),

   checkValidation
];

exports.create = [
   body('name').isString().withMessage('Invalid value for Name').bail()
      .trim().notEmpty().withMessage('Name cannot be blank')
      .isLength({ max: 200 }).withMessage('Name cannot be longer than 200 characters')
      .bail().custom(async (value) => {
         try {
            var product = await db.Product.findOne({ where: { name: value } });
         } catch (err) {
            throw new Error('Error in checking uniqueness of product name. Please try again later, or report the issue.');
         }

         if (product) {
            throw new Error('A product with this name already exists. Please enter a different name');
         }
      }),
   body('description').isString().withMessage('Invalid value for Description').bail()
      .trim().notEmpty().withMessage('Description cannot be blank')
      .escape(),
   body('category').isString().withMessage('Invalid value for Category').bail()
      .trim().notEmpty().withMessage('Category cannot be blank')
      .isLength({ max: 100 }).withMessage('Category cannot be longer than 100 characters'),
   body('price')
      .custom((value) => {
         if (!Number.isInteger(value)) {
            throw new Error('Invalid value for Price');
         }
         if (value < 0) {
            throw new Error('Price cannot be less than zero');
         }
         return true;
      }),
   body('quantityInStock')
      .custom((value) => {
         if (!Number.isInteger(value)) {
            throw new Error('Invalid value for Quantity In Stock');
         }
         if (value < 0) {
            throw new Error('Quantity In Stock cannot be less than zero');
         }
         return true;
      }),
   body('status').optional({ values: 'falsy' })
      .isString().withMessage('Invalid value for Status').bail()
      .trim().custom((value) => {
         const allowedValues = [ 'sale', 'not for sale' ];
         return allowedValues.includes(value); 
      }).withMessage('Invalid value for Status'),
   
   checkValidation
];

exports.update = [
   body('name').isString().withMessage('Invalid value for Name').bail()
      .trim().notEmpty().withMessage('Name cannot be blank')
      .isLength({ max: 200 }).withMessage('Name cannot be longer than 20 characters')
      .bail().custom(async (value, { req }) => {
         try {
            var product = await db.Product.findOne({ 
               where: {
                  name: value, 
                  id: { [Op.ne]: req.params.productId } 
               } 
            });
         } catch (err) {
            throw new Error('Error in checking uniqueness of product name. Please try again later, or report the issue.');
         }

         if (product) {
            throw new Error('A product with this name already exists. Please enter a different name');
         }
      }),
   body('description').isString().withMessage('Invalid value for Description').bail()
      .trim().notEmpty().withMessage('Description cannot be blank')
      .escape(),
   body('category').isString().withMessage('Invalid value for Category').bail()
      .trim().notEmpty().withMessage('Category cannot be blank')
      .isLength({ max: 100 }).withMessage('Category cannot be longer than 100 characters'),
   body('price')
      .custom((value) => {
         if (!Number.isInteger(value)) {
            throw new Error('Invalid value for Price');
         }
         if (value < 0) {
            throw new Error('Price cannot be less than zero');
         }
         return true;
      }),
   body('quantityInStock')
      .custom((value) => {
         if (!Number.isInteger(value)) {
            throw new Error('Invalid value for Quantity In Stock');
         }
         if (value < 0) {
            throw new Error('Quantity In Stock cannot be less than zero');
         }
         return true;
      }),
   body('status').optional({ values: 'falsy' })
      .isString().withMessage('Invalid value for Status').bail()
      .trim().custom((value) => {
         const allowedValues = [ 'sale', 'not for sale' ];
         return allowedValues.includes(value); 
      }).withMessage('Invalid value for Status'),
   
   checkValidation
];