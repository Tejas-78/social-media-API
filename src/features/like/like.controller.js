import LikeModel from "./like.model.js";

export default class LikeController{
    static getAllLikes(req,res){
        const postId = req.params.postId
        const likes = LikeModel.getAllLikes(postId)
        res.status(200).send(likes)
    }

    static toggleLike(req,res){
        const postId = req.params.postId
        const userId = req.userId
        const like = LikeModel.toggleLike(userId, postId)
        res.status(200).send(like)
    }
}