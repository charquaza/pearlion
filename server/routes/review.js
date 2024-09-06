const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../controllers/reviewController');

reviewRouter.get('/', reviewController.getAll);
reviewRouter.post('/', reviewController.create);

reviewRouter.get('/:reviewId', reviewController.getById);
reviewRouter.put('/:reviewId', reviewController.update);
reviewRouter.delete('/:reviewId', reviewController.delete);

module.exports = reviewRouter;