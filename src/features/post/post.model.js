import { ApplicationError } from "../../../error/application.error.js";
import {readJSONFile,writeJSONFile } from "../utils/file-utils.js";
import fs from 'fs';
import path from 'path'
const postFileName = 'data/post.json';


export default class PostModel{
    static  getAllPost(){
        const posts = readJSONFile(postFileName);
        return posts
    }

    static  getPostById(id){
        const post =  readJSONFile(postFileName).find(p => p.id == id)
        console.log(id)
        if(post){
            return post;
        }
        else{
            throw new ApplicationError('post is not found',404)
        }
    }

    static  getPost(userId){
        const usersPost = readJSONFile(postFileName).filter(p =>p.userId == userId);

        if(usersPost.length > 0){
            return usersPost
        }
        else{
            throw new ApplicationError('posts are not available',204)
        }
    }

    static  addNewPost(newPost){
        let posts = readJSONFile(postFileName);
        posts.push(newPost)
        writeJSONFile(postFileName,posts)
    }

    static deletePost(userId, postId) {
        const posts = readJSONFile(postFileName); 
        const postIndex = posts.findIndex(p => p.id == postId && p.userId == userId);
        
        if (postIndex === -1) {
            throw new ApplicationError('Post not found', 404); 
        } else {
            const post = posts[postIndex];
            const imagePath = path.join(path.resolve(), 'public', post.imgUrl); 
            if (fs.existsSync(imagePath)) {
                try {
                    fs.unlinkSync(imagePath);
                    console.log(`Deleted image: ${imagePath}`);
                } catch (err) {
                    console.error(`Error deleting image: ${err}`);
                }
            }
            posts.splice(postIndex, 1);
            writeJSONFile(postFileName, posts); 
            return true; 
        }
    }
    

    static updatePost(userId, postId, caption, imgUrl) {
        const posts = readJSONFile(postFileName); 
        const post = posts.find(p => p.userId == userId && p.id == postId);
        
        if (!post) {
            throw new ApplicationError('Post not found', 404); 
        } else {
            if (imgUrl && imgUrl !== post.imgUrl) {
                const oldImagePath = path.join(path.resolve(), 'public', post.imgUrl); 

                if (fs.existsSync(oldImagePath)) {
                    try {
                        fs.unlinkSync(oldImagePath);
                        console.log(`Deleted old image: ${oldImagePath}`);
                    } catch (err) {
                        console.error(`Error deleting old image: ${err}`);
                        
                    }
                }
            }
            post.caption = caption || post.caption; 
            post.imgUrl = imgUrl || post.imgUrl;    
            writeJSONFile(postFileName, posts);
            return true; 
        }
    }
}