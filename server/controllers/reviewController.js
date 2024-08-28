const db = require('../models/index');
const reviewValidators = require('../middleware/reviewValidators');

exports.getAll = [
   async function (req, res, next) {
      try {
         let reviewList = await db.Review.findAll({ raw: true })
         res.json({ data: reviewList });
      } catch (err) {
         return next(err);
      }
   }
];

exports.getById = [
   reviewValidators.checkIdParam,

   async function (req, res, next) {
      try {
         let reviewData = await db.Review.findByPk(req.params.reviewId);

         if (reviewData === null) {
            res.status(404).json({ errors: ['Review not found'] });
         } else {
            res.json({ data: reviewData.get() });
         }
      } catch (err) {
         return next(err);
      }
   }
];

exports.create = [
   async function checkPermissions(req, res, next) {
      if (!req.user) {
         return res.status(404).json({ errors: ['Review not found'] });
      }

      return next();
   },

   reviewValidators.create,

   async function (req, res, next) {
      try {
         const newReview = await db.Review.create({
            client: req.user.id,
            product: req.body.productId,
            rating: req.body.rating,
            review: req.body.review
         });

         res.json({ data: newReview.get() });
      } catch (err) {
         return next(err);
      }
   }
];

exports.update = [
   reviewValidators.checkIdParam,

   async function checkPermissions(req, res, next) {
      if (!req.user) {
         return res.status(404).json({ errors: ['Review not found'] });
      }

      try {
         let review = db.Review.findByPk(req.params.reviewId);

         if (review === null) {
            return res.status(404).json({ errors: ['Review not found'] });
         }

         if (req.user.id !== review.client && req.user.privilege !== 'admin') {
            return res.status(403).json({ errors: ['Not allowed'] });
         }
      } catch (err) {
         return next(err);
      }

      return next();
   },
   
   reviewValidators.update,

   async function (req, res, next) {
      try {
         let fieldsToUpdate = {
            rating: req.body.rating,
            review: req.body.review
         };

         let reviewToUpdate = await db.Review.findByPk(req.params.reviewId);

         if (reviewToUpdate === null) {
            res.status(404).json({ errors: ['Review not found'] });
         } else {
            let updatedReview = await reviewToUpdate.update(fieldsToUpdate);
            res.json({ data: updatedReview.get() });
         }
      } catch (err) {
         return next(err);
      }
   }
];

exports.delete = [
   reviewValidators.checkIdParam,

   async function checkPermissions(req, res, next) {
      if (!req.user) {
         return res.status(404).json({ errors: ['Review not found'] });
      }

      try {
         let review = db.Review.findByPk(req.params.reviewId);

         if (review === null) {
            return res.status(404).json({ errors: ['Review not found'] });
         }

         if (req.user.id !== review.client && req.user.privilege !== 'admin') {
            return res.status(403).json({ errors: ['Not allowed'] });
         }
      } catch (err) {
         return next(err);
      }

      return next();
   },

   async function (req, res, next) {
      try {
         let reviewToDelete = await db.Review.findByPk(req.params.reviewId);

         if (reviewToDelete === null) {
            res.status(404).json({ errors: ['Review not found'] });
         } else {
            await reviewToDelete.destroy();
            res.json({ data: { msg: 'Review delete successful' } });   
         }
      } catch (err) {
         return next(err);
      }
   }
];