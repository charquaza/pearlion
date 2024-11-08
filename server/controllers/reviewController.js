const db = require('../models/index');
const reviewValidators = require('../middleware/reviewValidators');
const { imageUpload } = require('../middleware/multerUploads');

exports.getAll = [
   reviewValidators.checkProductIdQuery,
   reviewValidators.checkImagesQuery,

   async function (req, res, next) {
      if (!req.query.productId && (req.user && req.user.privilege !== 'admin')) {
         return res.status(404).json({ errors: ['Review not found'] });
      }

      try {
         var reviewFindOptions = { 
            ...(req.query.productId && 
               {
                  where: { product: req.query.productId }
               }
            ),
            include: [
               {
                  model: db.User
               },
               (req.query.images && 
                  {
                     model: db.Image,
                     order: [[ 'createdAt', 'ASC' ]]
                  }
               )
            ],
            order: [ ['createdAt', 'DESC'] ]
         };

         let reviewList = await db.Review.findAll(reviewFindOptions);

         return res.json({ data: reviewList });
      } catch (err) {
         return next(err);
      }
   }
];

exports.getById = [
   reviewValidators.checkIdParam,
   reviewValidators.checkImagesQuery,

   async function (req, res, next) {
      try {
         var reviewFindOptions = { 
            include: [
               {
                  model: db.User
               },
               (req.query.images && 
                  {
                     model: db.Image,
                     order: [[ 'createdAt', 'ASC' ]]
                  }
               )
            ]
         };

         let reviewData = await db.Review.findByPk(req.params.reviewId, reviewFindOptions);

         if (reviewData === null) {
            return res.status(404).json({ errors: ['Review not found'] });
         } else {
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
      //user should only be allowed to write 1 review per product
      //restrict review creation for production

      return next();
   },

   imageUpload.array('images'),  //parse multipart/form-data first to populate req.body
   reviewValidators.create,

   async function (req, res, next) {
      try {
         const product = await db.Product.findByPk(req.body.productId, { raw: true });
         if (!product) {
            return res.status(404).json({ errors: ['Associated product not found'] });
         }

         const result = await db.sequelize.transaction(async t => {
            const newReview = await db.Review.create({
               client: req.user.id,
               product: req.body.productId,
               rating: req.body.rating,
               review: req.body.review
            }, { raw: true, transaction: t });

            const images = await Promise.all(req.files.map(file => {
               return db.Image.create({
                  review: newReview.id,
                  name: req.user.username + '_' + product.name,
                  description: 'Image uploaded with review of ' + product.name + 
                     ', by ' + req.user.username,
                  data: file.buffer
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
   
   imageUpload.array('newImages'),
   reviewValidators.update,

   async function (req, res, next) {
      try {
         let reviewToUpdate = await db.Review.findByPk(req.params.reviewId);
         if (reviewToUpdate === null) {
            return res.status(404).json({ errors: ['Review not found'] });
         }

         const product = await db.Product.findByPk(req.body.productId, { raw: true });
         if (!product) {
            return res.status(404).json({ errors: ['Associated product not found'] });
         }

         const updateResult = await db.sequelize.transaction(async t => {
            let reviewFieldsToUpdate = {
               rating: req.body.rating,
               review: req.body.review
            };

            let updateReviewPromise = reviewToUpdate.update(reviewFieldsToUpdate, 
               { transaction: t}
            );

            let createImagesPromise = Promise.all(req.files.map(file => {
               return db.Image.create({
                  review: reviewToUpdate.id,
                  name: req.user.username + '_' + product.name,
                  description: 'Image uploaded with review of ' + product.name + 
                     ', by ' + req.user.username,
                  data: file.buffer
               }, { raw: true, transaction: t });
            }));

            let deleteImagesPromise = req.body.deletedImages 
               ?
                  db.Image.destroy({
                     where: { id: JSON.parse(req.body.deletedImages) },
                     transaction: t
                  })
               : null;
            
            let [ updatedReview ] = await Promise.all([ 
               updateReviewPromise, createImagesPromise, deleteImagesPromise
            ]);

            return updatedReview.get({ plain: true });
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

         await reviewToDelete.destroy();

         res.json({ data: { msg: 'Review delete successful' } });   
      } catch (err) {
         return next(err);
      }
   }
];