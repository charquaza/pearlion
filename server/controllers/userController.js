const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const userValidators = require('../middleware/userValidators');

exports.getCurrUser = [
   function (req, res, next) {
      if (req.user) {
         let userDataCopy = { ...req.user };
         delete userDataCopy.password;
         res.json({ data: userDataCopy });
      } else {
         res.status(404).json({ errors: ['User not found'] });
      }
   }
];

exports.signUp = [
   userValidators.signUp,

   async function (req, res, next) {
      try {
         let hashedPassword = await bcrypt.hash(req.body.password, 10);

         let newUser = await db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            privilege: 'user',
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            phone: req.body.phone
         });
         newUser = newUser.get({ plain: true });

         req.user = user;
         return next();
      } catch (err) {
         return next(err);
      }
   },

   function (req, res, next) {
      let userDataCopy = { ...req.user };

      const token = jwt.sign(
         { id: userDataCopy.id }, 
         process.env.JWT_SECRET, 
         { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      delete userDataCopy.password;

      res.json({ data: userDataCopy, token });
   }
];

exports.logIn = [
   userValidators.logIn,

   function (req, res, next) {
      passport.authenticate('local', function (err, user, info) {
         if (err) {
            return next(err);
         }

         if (!user) {
            res.status(401).json({ errors: [ info.message ] });
         } else {
            req.user = user;
            return next();
         }
      })(req, res, next);
   },
   
   function (req, res, next) {
      let userDataCopy = { ...req.user };

      const token = jwt.sign(
         { id: userDataCopy.id }, 
         process.env.JWT_SECRET, 
         { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      delete userDataCopy.password;

      res.json({ data: userDataCopy, token });
   }
];

exports.logOut = [
   function (req, res, next) {
      return res.status(200).json({});
   }
];

exports.getAll = [
   function checkPermissions(req, res, next) {
      if (!req.user) {
         return res.status(404).json({ errors: ['User not found'] });
      }

      if (req.user.privilege !== 'admin') {
         return res.status(403).json({ errors: ['Not allowed'] });
      }

      return next();
   },

   async function (req, res, next) {
      try {
         let userList = await db.User.findAll({ 
            attributes: { exclude: ['password'] }, 
            raw: true 
         });
         res.json({ data: userList });
      } catch (err) {
         return next(err);
      }
   }
];

exports.getById = [
   function checkPermissions(req, res, next) {
      if (!req.user) {
         return res.status(404).json({ errors: ['User not found'] });
      }

      if (req.user.id !== req.params.userId && req.user.privilege !== 'admin') {
         return res.status(403).json({ errors: ['Not allowed'] });
      }

      return next();
   },

   userValidators.checkIdParam,

   async function (req, res, next) {
      try {
         let userData = await db.User.findByPk(req.params.userId, 
            { attributes: { exclude: ['password'] } }
         );

         if (userData === null) {
            res.status(404).json({ errors: ['User not found'] });
         } else {
            res.json({ data: userData.get({ plain: true }) });
         }
      } catch (err) {
         return next(err);
      }
   }
];

exports.update = [
   userValidators.checkIdParam,

   function checkPermissions(req, res, next) {
      if (!req.user) {
         return res.status(404).json({ errors: ['User not found'] });
      }

      if (req.user.id !== req.params.userId && req.user.privilege !== 'admin') {
         return res.status(403).json({ errors: ['Not allowed'] });
      }

      return next();
   },
   
   userValidators.update,

   async function (req, res, next) {
      try {
         let fieldsToUpdate = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone || null
         };

         //update password if new password has been provided
         if (req.body.newPassword) {
            let hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
            fieldsToUpdate.password = hashedPassword;
         }

         let userToUpdate = await db.User.findByPk(req.params.userId);
         if (userToUpdate === null) {
            res.status(404).json({ errors: ['User not found'] });
         } else {
            let updatedUser = await userToUpdate.update(fieldsToUpdate, { returning: true });

            let userDataCopy = updatedUser.get({ plain: true });
            delete userDataCopy.password;
            res.json({ data: userDataCopy });
         }
      } catch (err) {
         return next(err);
      }
   }
];

exports.delete = [
   function checkPermissions(req, res, next) {
      if (!req.user) {
         return res.status(404).json({ errors: ['User not found'] });
      }

      if (req.user.privilege !== 'admin') {
         return res.status(403).json({ errors: ['Not allowed'] });
      }

      return next();
   },

   userValidators.checkIdParam,

   async function (req, res, next) {
      try {
         let userToDelete = await db.User.findByPk(req.params.userId);

         if (userToDelete === null) {
            res.status(404).json({ errors: ['User not found'] });
         } else {
            await userToDelete.destroy();
            res.json({ data: { msg: 'User delete successful' } });   
         }
      } catch (err) {
         return next(err);
      }
   }
];