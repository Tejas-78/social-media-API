import express from 'express';
import CommentController from './comment.controller.js';



const commentRouter = express.Router();

commentRouter.get('/:id',CommentController.getById)
commentRouter.post('/:id',CommentController.addComment)
commentRouter.delete('/:id',CommentController.deleteComment)
commentRouter.put('/:id',CommentController.updateComment)

export default commentRouter;