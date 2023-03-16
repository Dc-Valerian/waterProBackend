import multer from "multer"
import { Request } from "express"
type DestinationCallBack = (error:Error | null, destination : string)=>void;
type FileCallBack = (error:Error | null, filename : string) =>void;
const Storage = multer.diskStorage({
    destination:(
        req:Request,
        file:Express.Multer.File,
        cb:DestinationCallBack
    )=>{
        cb(null,"upload")
    },
    filename:(
        req:Request,
        file:Express.Multer.File,
        cb:FileCallBack
    )=>{
        cb(null,file.originalname)
    },
})
const Upload = multer({
    storage :Storage
}).single("profileImage")
export default Upload