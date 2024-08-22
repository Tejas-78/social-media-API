import multer from "multer";

const storageConfig = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/post-Images');
    },
    filename:(req,file,cb) =>{
        const name = Date.now() +'-'+file.originalname;
        cb(null,name);
    }
})
// for updated image
export const uploadPostImage = multer({
    storage:storageConfig,
})