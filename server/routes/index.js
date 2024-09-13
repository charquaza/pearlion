const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const productRouter = require('./product');
const orderRouter = require('./order');
const reviewRouter = require('./review');

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);
router.use('/reviews', reviewRouter);

module.exports = router;