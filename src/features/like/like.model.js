import { ApplicationError } from "../../../error/application.error.js";
import {generateUniqueId, readJSONFile,writeJSONFile } from "../utils/file-utils.js";
const likeFileName = 'data/like.json'
const postFileName = 'data/post.json'

export default class LikeModel{
    static getAllLikes(postId) {
        const likes = readJSONFile(likeFileName);
        const postLikes = likes.filter(like => like.postId === postId);
        if(!postLikes.length >0){
            throw new ApplicationError('no likes for this post',204)
        }
        return postLikes;
    }
    static toggleLike(userId, postId) {
        let toggle = '';
        const likes = readJSONFile(likeFileName);
        const likeIndex = likes.findIndex(like => like.userId == userId && like.postId == postId);
        if (likeIndex == -1) {
            const newLike = {
                id: generateUniqueId(), 
                userId,
                postId,
                createdAt: new Date().toISOString()
            };
            likes.push(newLike);
            toggle = 'liked post successfully';  
        } 
        else {
            likes.splice(likeIndex, 1);
            toggle = 'unliked post successfully';  

        }

        writeJSONFile(likeFileName, likes);

        return toggle;
    }
}