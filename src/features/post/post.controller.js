import PostModel from "./post.model.js";
import { generateUniqueId } from "../utils/file-utils.js";
import { ApplicationError } from "../../../error/application.error.js";


export default class PostController{
    static getAllPost(req,res){
            const posts = PostModel.getAllPost();
            res.status(200).send(posts)     
    }

    static getPostById(req,res){
        const id = req.params.id
        const post = PostModel.getPostById(id);
        try{
      
        res.status(200).send(post)
    }
    catch(err){
        console.log(err)
    }
    }

    static getPost(req,res){
        const userId = req.userId;
        
        const usersPost = PostModel.getPost(userId);
        res.status(200).send(usersPost)
    
    }

    static addNewPost(req,res){
            const {caption} =req.body;
        const userId = req.userId;
        const imgUrl = 'post-Images/'+req.file.filename;
        const newPost={
            id:generateUniqueId(),
            userId,
            caption,
            imgUrl
        }
        PostModel.addNewPost(newPost)
            res.status(201).send('post created successfully')
        
    }

    static deletePost(req,res){
        const userId = req.userId
        const id = req.params.id;
        PostModel.deletePost(userId,id)
        try{
            res.status(204).send('post deleted successfully')
        }
        catch(err){
            throw new ApplicationError('post not found',404) 
            
        }
    }

    static updatePost(req,res){
        try{
        const {caption} = req.body;
        const imgUrl='post-Images/'+req.file.filename;
        const userId = req.userId;
        const id = req.params.id;
        PostModel.updatePost(userId,id,caption,imgUrl)
        res.status(200).send('post updated successfully')
        }
        catch(err){
            console.log(err)
        }
    }
}