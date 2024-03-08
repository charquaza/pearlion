const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const productRouter = require('./product');
const orderRouter = require('./order');

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);

module.exports = router;