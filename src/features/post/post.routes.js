import express from 'express';
import PostController from './post.controller.js';
import { uploadPostImage } from '../../middleware/post-upload.middleware.js';
import jwtAuth from '../../middleware/jwt-Auth.middleware.js';

const postRouter = express.Router();


postRouter.get('/',PostController.getPost)
postRouter.get('/all',PostController.getAllPost)
postRouter.get('/:id',PostController.getPostById)

postRouter.post('/',uploadPostImage.single("imgUrl"),PostController.addNewPost)
postRouter.delete('/:id',PostController.deletePost)
postRouter.put('/:id',uploadPostImage.single("imgUrl"),PostController.updatePost)

export default postRouter