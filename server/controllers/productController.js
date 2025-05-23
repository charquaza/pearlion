const db = require('../models/index');
const productValidators = require('../middleware/productValidators');
const { imageUpload } = require('../middleware/multerUploads');
const { bucket } = require('../storage/storageConfig');

exports.getAll = [
   productValidators.checkStatusQuery,
   productValidators.checkCategoryQuery,
   productValidators.checkImagesQuery,
   productValidators.checkProductIdsQuery,

   async function (req, res, next) {
      //if productIds query param did not contain any valid IDs,
      //validator returns empty string ''
      //return [] immediately, otherwise database query will return all products
      if (req.query.productIds === '') {
         return res.json({ data: [] });
      }

      try {
         var productFindOptions = { 
            where: { 
               ...(req.query.status && { status: req.query.status.split(',') }),
               ...(req.query.category && { category: req.query.category }),
               ...(req.query.productIds && { id: req.query.productIds.split(',') })
            }, 
            ...(req.query.images && 
               {
                  include: [
                     {
                        model: db.Image,
                        order: [[ 'name', 'ASC' ]],
                        ...(req.query.images === 'main' && { limit: 1 })
                     }
                  ]
               }
            ),
            order: [ ['status', 'ASC'], ['createdAt', 'DESC'] ]
         };

         let productList = await db.Product.findAll(productFindOptions);

         //split results into multiple arrays by Product.status
         if (req.query.status && req.query.status.includes(',') && productList.length > 0) {
            let splitList = [];
            let currStatus = productList[0].status;
            let currStartIndex = 0;

            for (var i = 0; i < productList.length; i++) {
               if (productList[i].status !== currStatus) {
                  splitList.push(productList.slice(currStartIndex, i));
                  currStatus = productList[i].status;
                  currStartIndex = i;
               }
            }
            splitList.push(productList.slice(currStartIndex, i));

            productList = splitList;
         }

         return res.json({ data: productList });   
      } catch (err) {
         return next(err);
      }
   }
];

exports.getById = [
   productValidators.checkIdParam,
   productValidators.checkImagesQuery,

   async function (req, res, next) {
      try {
         var productFindOptions = { 
            ...(req.query.images && 
               {
                  include: [
                     {
                        model: db.Image,
                        order: [[ 'name', 'ASC' ]],
                        ...(req.query.images === 'main' && { limit: 1 })
                     }
                  ]
               }
            )
         };

         let productData = await db.Product.findByPk(
            req.params.productId, productFindOptions
         );

         if (productData === null) {
            res.status(404).json({ errors: ['Product not found'] });
         } else {
            res.json({ data: productData });
         }
      } catch (err) {
         return next(err);
      }
   }
];

exports.create = [
   function checkPermissions(req, res, next) {
      if (!req.user) {
         return res.status(404).json({ errors: ['Product not found'] });
      }

      if (req.user.privilege !== 'admin') {
         return res.status(403).json({ errors: ['Not allowed'] });
      }

      return next();
   },

   imageUpload.array('images'),
   productValidators.create,

   async function (req, res, next) {
      try {
         const result = await db.sequelize.transaction(async t => {
            const newProduct = await db.Product.create({
               name: req.body.name,
               description: req.body.description,
               category: req.body.category,
               price: req.body.price,
               quantityInStock: req.body.quantityInStock,
               status: req.body.status
            }, { raw: true, transaction: t });
   
            const images = await Promise.all(req.files.map((file, index) => {
               const fileName = newProduct.name + index;
               const newUpload = bucket.file(`product-images/${newProduct.category}/${fileName}`);

               return newUpload.save(file.buffer, {
                  metadata: { contentType: file.mimetype },
               })
               .then(() => {
                  return db.Image.create({
                     product: newProduct.id,
                     name: fileName,
                     description: newProduct.name + index,
                     url: newUpload.publicUrl()
                  }, { raw: true, transaction: t });
               })
            }));

            return newProduct;
         });

         res.json({ data: result });
      } catch (err) {
         return next(err);
      }
   }
];

exports.update = [
   productValidators.checkIdParam,

   function checkPermissions(req, res, next) {
      if (!req.user) {
         return res.status(404).json({ errors: ['Product not found'] });
      }

      if (req.user.privilege !== 'admin') {
         return res.status(403).json({ errors: ['Not allowed'] });
      }

      return next();
   },
   
   imageUpload.array('images'),
   productValidators.update,

   async function (req, res, next) {
      try {
         let productToUpdate = await db.Product.findByPk(req.params.productId);

         if (productToUpdate === null) {
            return res.status(404).json({ errors: ['Product not found'] });
         }

         const updatedProduct = await db.sequelize.transaction(async t => {
            let productFieldsToUpdate = {
               name: req.body.name,
               description: req.body.description,
               category: req.body.category,
               price: req.body.price,
               quantityInStock: req.body.quantityInStock,
               status: req.body.status
            };
   
            let updateProductPromise = productToUpdate.update(productFieldsToUpdate, 
               { returning: true, transaction: t }
            );

            //reconsider method for updating images
            // e.g. how to deal with naming conflicts, 
            // since names are based on index
            // and deleting and adding images can jeopardize order
            let createImagesPromise = Promise.all(req.files.map((file, index) => {
               const fileName = req.body.name + index;
               const newUpload = bucket.file(`product-images/${newProduct.category}/${fileName}`);

               return newUpload.save(file.buffer, {
                  metadata: { contentType: file.mimetype },
               })
               .then(() => {
                  return db.Image.create({
                     product: productToUpdate.id,
                     name: fileName,
                     description: req.body.name + index,
                     url: newUpload.publicUrl()
                  }, { raw: true, transaction: t });
               })
            }));

            let deleteImagesPromise = req.body.deletedImages 
               ?
                  db.Image.destroy({
                     where: { id: req.body.deletedImages },
                     transaction: t
                  })
               : null;
            
            let [ updatedProduct ] = await Promise.all([ 
               updateProductPromise, createImagesPromise, deleteImagesPromise
            ]);

            return updatedProduct.get({ plain: true });
         });

         res.json({ data: updatedProduct });
      } catch (err) {
         return next(err);
      }
   }
];

exports.delete = [
   function checkPermissions(req, res, next) {
      if (!req.user) {
         return res.status(404).json({ errors: ['Product not found'] });
      }

      if (req.user.privilege !== 'admin') {
         return res.status(403).json({ errors: ['Not allowed'] });
      }

      return next();
   },

   productValidators.checkIdParam,

   async function (req, res, next) {
      try {
         let productToDelete = await db.Product.findByPk(req.params.productId);

         if (productToDelete === null) {
            res.status(404).json({ errors: ['Product not found'] });
         } else {
            await productToDelete.destroy();
            res.json({ data: { msg: 'Product delete successful' } });   
         }
      } catch (err) {
         return next(err);
      }
   }
];