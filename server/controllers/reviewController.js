const db = require('../models/index');
const reviewValidators = require('../middleware/reviewValidators');

exports.getAll = [
   reviewValidators.checkProjectIdQuery,

   async function (req, res, next) {
      var findOptions;
      if (req.query.projectId) {
         findOptions = { 
            where: { product: req.query.projectId },
            raw: true 
         };
      } else {
         if (req.user.privilege !== 'admin') {
            return res.status(404).json({ errors: ['Review not found'] });
         }

         findOptions = { raw: true };
      }

      try {
         let reviewList = await db.Review.findAll(findOptions);

         if (reviewList.length === 0) {
            return res.status(404).json({ errors: ['Review not found'] });
         }

         let allReviewImages = await Promise.all(reviewList.map(review => {
            return db.ReviewImages.findAll({
               where: { review: review.id },
               raw: true
            });
         }));
         
         let allImages = await Promise.all(allReviewImages.map(reviewImageList => {
            return Promise.all(reviewImageList.map(reviewImage => {
               return db.Image.findByPk(reviewImage.image, { raw: true });
            }));
         })); 
         
         allImages.forEach(imageList => {
            imageList.sort((a, b) => {
               if (a.name < b.name) {
                  return -1;
               } else if (a.name === b.name) {
                  return 0;
               } else {
                  return 1;
               }
            });
         });

         //append images to each review
         reviewList.forEach((review, index) => {
            review.images = allImages[index];
         });

         return res.json({ data: reviewList });
      } catch (err) {
         return next(err);
      }
   }
];

exports.getById = [
   reviewValidators.checkIdParam,

   async function (req, res, next) {
      try {
         let reviewData = await db.Review.findByPk(req.params.reviewId, { raw: true });

         if (reviewData === null) {
            return res.status(404).json({ errors: ['Review not found'] });
         } else {
            //get review images
            let reviewImages = await db.ReviewImages.findAll({
               where: { review: req.params.reviewId },
               raw: true
            });
            
            let images = await Promise.all(reviewImages.map(reviewImage => {
               return db.Image.findByPk(reviewImage.image, { raw: true });
            }));
            images.sort((a, b) => {
               if (a.name < b.name) {
                  return -1;
               } else if (a.name === b.name) {
                  return 0;
               } else {
                  return 1;
               }
            });

            reviewData.images = images;

            return res.json({ data: reviewData });
         }
      } catch (err) {
         return next(err);
      }
   }
];

exports.create = [
   function checkPermissions(req, res, next) {
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
         let review = await db.Review.findByPk(req.params.reviewId);

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
         let review = await db.Review.findByPk(req.params.reviewId);

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