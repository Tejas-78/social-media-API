import {readJSONFile,writeJSONFile} from '../utils/file-utils.js';
import { ApplicationError } from '../../../error/application.error.js';
const userFileName = 'data/user.json'
export default class UserModel{
    static registerUser(newUser){
        const users = readJSONFile(userFileName);
        users.push(newUser)
        writeJSONFile(userFileName,users);
    }

    static loginUser(email,password){
        const users = readJSONFile(userFileName);
        const validUser = users.find(u => u.email == email && u.password == password)
        if(validUser){
            return validUser;
        }
        else{
            throw new ApplicationError('invalid email or password',400)
        }    
    }
}