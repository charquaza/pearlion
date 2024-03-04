const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/', userController.getAll);
userRouter.get('/curr-user', userController.getCurrUser);

userRouter.post('/sign-up', userController.signUp);
userRouter.post('/log-in', userController.logIn);
userRouter.post('/log-out', userController.logOut);

userRouter.get('/:userId', userController.getById);
userRouter.put('/:userId', userController.update);
userRouter.delete('/:userId', userController.delete);

module.exports = userRouter;