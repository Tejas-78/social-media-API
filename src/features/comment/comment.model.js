import { ApplicationError } from "../../../error/application.error.js";
import { readJSONFile,writeJSONFile } from "../utils/file-utils.js";
const commentFileName = 'data/comment.json'
const postFileName = 'data/post.json';


export default class CommentModel{
    static getById(postId){
        const comments = readJSONFile(commentFileName);
        const comment = comments.filter(c=> c.postId == postId)
        if(!comment.length > 0){
            return false
        }
        return  comment
    }

    static addComment(id,userId,postId,content){
        const posts = readJSONFile(postFileName)
        const post = posts.find(p => p.id == postId)
        if(!post){
            throw new ApplicationError('Post is not found for add comment',404)
        }
        const comments = readJSONFile(commentFileName);
        const commentObj = {id,userId,postId,content}
        comments.push(commentObj)
        writeJSONFile(commentFileName,comments);
        return true
    }

    static deleteComment(id, userId) {
        const comments = readJSONFile(commentFileName);
        const commentIndex = comments.findIndex(c => c.userId == userId && c.id == id);
        
        if (commentIndex === -1) {
            throw new ApplicationError('Comment not found', 404);
        }
        
        const comment = comments[commentIndex];
        if (comment.userId != userId) {
            throw new ApplicationError('You are not authorized to delete this comment', 401);
        }
        comments.splice(commentIndex, 1);
        writeJSONFile(commentFileName, comments); 
    }
    
    static updateComment(id,userId,newContent){
        const comments = readJSONFile(commentFileName);
        const commentIndex = comments.findIndex(c => c.userId == userId && c.id == id);
        
        if (commentIndex === -1) {
            throw new ApplicationError('Comment not found', 404);
        }
        
        const comment = comments[commentIndex];
        if (comment.userId != userId) {
            throw new ApplicationError('You are not authorized to update this comment', 401);
        }

        comment.content = newContent
        writeJSONFile(commentFileName,comments)
    }

}