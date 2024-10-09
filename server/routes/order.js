const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');

orderRouter.get('/', orderController.getAll);
orderRouter.post('/', orderController.create);

orderRouter.post('/checkout', orderController.checkout);

orderRouter.get('/:orderId', orderController.getById);
orderRouter.put('/:orderId', orderController.update);
orderRouter.delete('/:orderId', orderController.delete);

module.exports = orderRouter;