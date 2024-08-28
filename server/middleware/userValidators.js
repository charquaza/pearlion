const { body, param, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
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
   param('userId').isString().withMessage('Invalid value for userId').bail()
      .trim().notEmpty().withMessage('userId cannot be blank'),

   checkValidation
];

exports.signUp = [
   body('firstName').isString().withMessage('Invalid value for First Name').bail()
      .trim().notEmpty().withMessage('First name cannot be blank')
      .isLength({ max: 53 }).withMessage('First name cannot be longer than 53 characters')
      .escape(),
   body('lastName').isString().withMessage('Invalid value for Last Name').bail()
      .trim().notEmpty().withMessage('Last name cannot be blank')
      .isLength({ max: 53 }).withMessage('Last name cannot be longer than 53 characters')
      .escape(),
   body('privilege').optional({ values: 'falsy' })
      .isString().withMessage('Invalid value for Privilege').bail()
      .trim().custom((value) => {
         const allowedValues = [ 'admin', 'user' ];
         return allowedValues.includes(value); 
      }).withMessage('Invalid value for Privilege'),
   body('username').isString().withMessage('Invalid value for Username').bail()
      .trim().notEmpty().withMessage('Username cannot be blank')
      .isLength({ max: 20 }).withMessage('Username cannot be longer than 20 characters')
      .not().matches(/[<>&'"/]/).withMessage('Username cannot contain the following characters: <, >, &, \', ", /')
      .bail().custom(async (value) => {
         try {
            var user = await db.User.findOne({ where: { username: value } });
         } catch (err) {
            throw new Error('Error in checking uniqueness of username. Please try again later, or report the issue.');
         }

         if (user) {
            throw new Error('Username is already in use. Please enter a different username');
         }
      }),
   body('password').isString().withMessage('Invalid value for Password').bail()
      .trim().notEmpty().withMessage('Password cannot be blank')
      .isLength({ min: 8 }).withMessage('Password cannot be shorter than 8 characters')
      .isLength({ max: 15 }).withMessage('Password cannot be longer than 15 characters')
      .isStrongPassword({ minLength: 0, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })
      .withMessage('Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 number')
      .not().matches(/[<>&'"/]/).withMessage('Password cannot contain the following characters: <, >, &, \', ", /'),
   body('confirmPassword').custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords do not match'),
   body('email').isString().withMessage('Invalid value for Email').bail()
      .trim().notEmpty().withMessage('Email cannot be blank')
      .isLength({ max: 324 }).withMessage('Email is too long; please enter a valid email address')
      .isEmail({ allow_underscores: true }).withMessage('Please enter a valid email address, e.g. username@aol.com')
      .custom(async (value) => {
         try {
            var user = await db.User.findOne({ where: { email: value } });
         } catch (err) {
            throw new Error('Error in checking uniqueness of email. Please try again later, or report the issue.');
         }

         if (user) {
            throw new Error('This email is linked to an existing account. Please enter a different email address');
         }
      }),
   body('phone').isString().withMessage('Invalid value for Phone').bail()
      .trim().notEmpty().withMessage('Phone number cannot be blank')
      .isLength({ max: 25 }).withMessage('Phone number is too long; please enter a valid phone number')
      .isMobilePhone().withMessage('Please enter a valid phone number')
      .escape(),
   
   checkValidation
];

exports.logIn = [
   body('username').isString().withMessage('Invalid value for Username').bail()
      .trim().notEmpty().withMessage('Please enter a Username'),
   body('password').isString().withMessage('Invalid value for Password').bail()
      .trim().notEmpty().withMessage('Please enter a Password'),
   
   checkValidation
];

exports.update = [
   body('firstName').isString().withMessage('Invalid value for First Name').bail()
      .trim().notEmpty().withMessage('First name cannot be blank')
      .isLength({ max: 53 }).withMessage('First name cannot be longer than 53 characters')
      .escape(),
   body('lastName').isString().withMessage('Invalid value for Last Name').bail()
      .trim().notEmpty().withMessage('Last name cannot be blank')
      .isLength({ max: 53 }).withMessage('Last name cannot be longer than 53 characters')
      .escape(),
   body('username').isString().withMessage('Invalid value for Username').bail()
      .trim().notEmpty().withMessage('Username cannot be blank')
      .isLength({ max: 20 }).withMessage('Username cannot be longer than 20 characters')
      .not().matches(/[<>&'"/]/).withMessage('Username cannot contain the following characters: <, >, &, \', ", /')
      .bail().custom(async (value, { req }) => {
         try {
            var user = await db.User.findOne({ 
               where: { 
                  username: value, 
                  id: { [Op.ne]: req.params.userId } 
               } 
            });
         } catch (err) {
            throw new Error('Error in checking uniqueness of username. Please try again later, or report the issue.');
         }

         if (user) {
            throw new Error('Username is already in use. Please enter a different username');
         }
      }),
   body('newPassword')
      .if((value) => {
         //skip validation if newPassword field was omitted
         return value !== undefined;
      })
      .isString().withMessage('Invalid value for New Password').bail()
      .trim().notEmpty().withMessage('New Password cannot be blank')
      .isLength({ min: 8 }).withMessage('New Password cannot be shorter than 8 characters')
      .isLength({ max: 15 }).withMessage('New Password cannot be longer than 15 characters')
      .isStrongPassword({ minLength: 0, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })
      .withMessage('New Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 number')
      .not().matches(/[<>&'"/]/).withMessage('New Password cannot contain the following characters: <, >, &, \', ", /'),
   body('confirmNewPassword')
      .if((value, { req }) => {
         //skip validation if newPassword field was omitted
         return req.body.newPassword !== undefined;
      })
      .custom((value, { req }) => value === req.body.newPassword)
      .withMessage('New Passwords do not match'),
   body('currPassword')
      .custom(
         (value, { req }) => {
            const passwordsMatch = bcrypt.compareSync(value, req.user.password);
            return passwordsMatch;
         }).withMessage('Incorrect password'),
   body('email').isString().withMessage('Invalid value for Email').bail()
      .trim().notEmpty().withMessage('Email cannot be blank')
      .isLength({ max: 324 }).withMessage('Email is too long; please enter a valid email address')
      .isEmail({ allow_underscores: true }).withMessage('Please enter a valid email address, e.g. username@aol.com')
      .custom(async (value, { req }) => {
         try {
            var user = await db.User.findOne({ 
               where: { 
                  email: value,
                  id: { [Op.ne]: req.params.userId } 
               } 
            });
         } catch (err) {
            throw new Error('Error in checking uniqueness of email. Please try again later, or report the issue.');
         }

         if (user) {
            throw new Error('This email is linked to an existing account. Please enter a different email address');
         }
      }),
   body('phone').isString().withMessage('Invalid value for Phone').bail()
      .trim().notEmpty().withMessage('Phone number cannot be blank')
      .isLength({ max: 25 }).withMessage('Phone number is too long; please enter a valid phone number')
      .isMobilePhone().withMessage('Please enter a valid phone number')
      .escape(),
   
   checkValidation
];