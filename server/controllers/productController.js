const db = require('../models/index');
const productValidators = require('../middleware/productValidators');

exports.getAll = [
   productValidators.checkStatusQuery,
   productValidators.checkCategoryQuery,
   productValidators.checkImagesQuery,

   async function (req, res, next) {
      try {
         const productFindOptions = { 
            where: { 
               ...(req.query.status && { status: req.query.status }),
               ...(req.query.category && { status: req.query.category })
            }, 
            raw: true 
         };
         const productList = await db.Product.findAll(productFindOptions);

         if (req.query.images === 'false') {
            return res.json({ data: { productList } });
         } else {
            const productImageList = await db.ProductImage.findAll({
               where: { product: productList.map(product => product.id) },
               raw: true
            });
            const imageList = await db.Image.findAll({
               where: { id: productImageList.map(productImage => productImage.image) },
               raw: true
            });
   
            return res.json({ data: { productList, imageList } });   
         }
      } catch (err) {
         return next(err);
      }
   }
];

exports.getById = [
   productValidators.checkIdParam,

   async function (req, res, next) {
      try {
         let productData = await db.Product.findByPk(req.params.productId);

         if (productData === null) {
            res.status(404).json({ errors: ['Product not found'] });
         } else {
            res.json({ data: productData.get({ plain: true }) });
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

   productValidators.create,

   async function (req, res, next) {
      try {
         let newProduct = await db.Product.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            quantityInStock: req.body.quantityInStock,
            status: req.body.status
         });

         res.json({ data: newProduct.get({ plain: true }) });
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
   
   productValidators.update,

   async function (req, res, next) {
      try {
         let fieldsToUpdate = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            quantityInStock: req.body.quantityInStock,
            status: req.body.status
         };

         let productToUpdate = await db.Product.findByPk(req.params.productId);

         if (productToUpdate === null) {
            res.status(404).json({ errors: ['Product not found'] });
         } else {
            let updatedProduct = await productToUpdate.update(fieldsToUpdate);
            res.json({ data: updatedProduct.get({ plain: true }) });
         }
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