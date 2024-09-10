const multer = require('multer');
const db = require('../models/index');
const reviewValidators = require('../middleware/reviewValidators');

const upload = multer({
   storage: multer.memoryStorage(),
   fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
         cb(null, true); 
      } else {
         cb(new Error('Invalid file type: please submit an image'), false);
      }
   }
});

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
            return db.ReviewImage.findAll({
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
            let reviewImages = await db.ReviewImage.findAll({
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
   upload.array('images'),

   async function (req, res, next) {
      try {
         const result = await db.sequelize.transaction(async t => {
            const newReview = await db.Review.create({
               client: req.user.id,
               product: req.body.productId,
               rating: req.body.rating,
               review: req.body.review
            }, { raw: true, transaction: t });

            const images = await Promise.all(req.files.map(file => {
               return db.Image.create({
                  name: req.user.username + '_' + req.body.productId,
                  description: 'Customer image uploaded with product review',
                  data: imageFile.buffer
               }, { raw: true, transaction: t });
            }));

            const reviewImages = await Promise.all(images.map(image => {
               return db.ReviewImage.create({
                  review: newReview.id,
                  image: image.id
               }, { raw: true, transaction: t });
            }));

            return newReview;
         });

         res.json({ data: result });
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
   upload.array('newImages'),

   async function (req, res, next) {
      try {
         let reviewToUpdate = await db.Review.findByPk(req.params.reviewId, { raw: true });

         if (reviewToUpdate === null) {
            return res.status(404).json({ errors: ['Review not found'] });
         }

         const updateResult = await db.sequelize.transaction(async t => {
            let reviewFieldsToUpdate = {
               rating: req.body.rating,
               review: req.body.review
            };

            let updateReviewPromise = reviewToUpdate.update(reviewFieldsToUpdate, 
               { raw: true, transaction: t}
            );

            let createImagesPromise = Promise.all(req.files.map(file => {
               return db.Image.create({
                  name: req.user.username + '_' + reviewToUpdate.product,
                  description: 'Customer image uploaded with product review',
                  data: file.buffer
               }, { raw: true, transaction: t });
            }));

            let deleteImagesPromise = req.body.deletedImages 
               ?
                  db.Image.destroy({
                     where: { id: req.body.deletedImages },
                     transaction: t
                  })
               : null;
            
            let [ updatedReview ] = await Promise.all([ 
               updateReviewPromise, createImagesPromise, deleteImagesPromise
            ]);

            return updatedReview;
         });

         res.json({ data: updateResult });
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
            return res.status(404).json({ errors: ['Review not found'] });
         } 

         await db.sequelize.transaction(async t => {
            let reviewImages = await db.ReviewImage.findAll({ 
               where: { review: reviewToDelete.id },
               raw: true,
               transaction: t 
            });

            let imagesToDelete = Promise.all(reviewImages.map(reviewImage => {
               db.Image.destroy({ where: { id: reviewImage.image }, transaction: t });
            }));

            await Promise.all([ reviewToDelete.destroy({ transaction: t }), imagesToDelete ]);
         });

         res.json({ data: { msg: 'Review delete successful' } });   
      } catch (err) {
         return next(err);
      }
   }
];