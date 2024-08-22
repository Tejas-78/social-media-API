import express from 'express';
import UserController from "./user.controller.js";
import { registrationAuthMiddleware } from '../../middleware/user-registration.middleware.js';

const userRouter = express.Router();

userRouter.post('/signup',registrationAuthMiddleware,UserController.registerUser);
userRouter.post('/signin',UserController.loginUser);

export default userRouter