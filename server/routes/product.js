const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');

productRouter.use(express.json());

productRouter.get('/', productController.getAll);
productRouter.post('/', productController.create);

productRouter.get('/:productId', productController.getById);
productRouter.put('/:productId', productController.update);
productRouter.delete('/:productId', productController.delete);

module.exports = productRouter;