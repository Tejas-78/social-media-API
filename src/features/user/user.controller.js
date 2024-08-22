import { ApplicationError } from "../../../error/application.error.js";
import {generateUniqueId,readJSONFile,writeJSONFile} from '../utils/file-utils.js';
import jwt from "jsonwebtoken";
import UserModel from "./user.model.js";

export default class UserController{
    static registerUser(req,res){
        const {name,email,password} = req.body
        const newUser = {
            id : generateUniqueId(),
            name,email,password};
        try{
        UserModel.registerUser(newUser)
        res.status(201).send('User register successfully')
        }catch(err){
            throw new Error(err)
        }
    }
    
    static loginUser(req,res){
        const {email,password} = req.body
        const validUser = UserModel.loginUser(email,password)
        if(validUser){
            const token = jwt.sign(
                {
                    userId:validUser.id,
                    email:validUser.email,
                },
                    'TXBkRYzthPP9gRHmVXuXuQuIEdf2nuRx',
                {
                    expiresIn :'5h'
                }
            )
            res.status(200).json({
                success :'Login successfully',
                token:token
            });
        }
        
    }
}