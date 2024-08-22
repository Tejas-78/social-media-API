import jwt from "jsonwebtoken";
import { ApplicationError } from "../../error/application.error.js";

export default function jwtAuth(req,res,next){
    const token = req.headers['authorization'] 
    if(!token){
        throw new ApplicationError('Unauthorized',400)
    }
    try{
    const payload = jwt.verify(token,"TXBkRYzthPP9gRHmVXuXuQuIEdf2nuRx");
        req.userId = payload.userId;
    }
    catch(err){
        throw new ApplicationError('Unauthorized',400)
    }
    next();
}