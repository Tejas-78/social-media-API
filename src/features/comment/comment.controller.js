import CommentModel from "./comment.model.js";
import { generateUniqueId } from "../utils/file-utils.js";
import { ApplicationError } from "../../../error/application.error.js";

export default class CommentController{
    static getById(req,res){
        const postId = req.params.id;
        const comment = CommentModel.getById(postId)
        if(comment){
            res.status(200).send(comment)
        }
        else{
            throw new ApplicationError('comments not available',204)
        }
    }

    static addComment(req,res){
        const userId = req.userId
        const postId = req.params.id;
        const {content} = req.body
        const id = generateUniqueId();
        // const commentObj = {id,userId,postId,content}
        const comment = CommentModel.addComment(id,userId,postId,content)
        try{
            res.status(200).send('Comment added successfully')
        }
        catch(err){
            throw new ApplicationError('comments not available',204)
        }
    }

    static deleteComment(req,res){
        const id = req.params.id;
        const userId = req.userId;
        CommentModel.deleteComment(id,userId)
        try{
            res.status(204).send('comment deleted successfully')
        }
        catch(err){
            throw new ApplicationError('comments not available',204)
        }
    }

    static updateComment(req,res){
        try{
        const id = req.params.id;
        const userId = req.userId;
        const {content} = req.body;
        CommentModel.updateComment(id,userId,content)
        res.status(204).send('comment updated successfully')
        }
        catch(err){
            throw new ApplicationError('comments not available',204)
        }
    
    }

}