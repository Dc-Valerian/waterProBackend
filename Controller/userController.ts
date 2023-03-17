import userModel from "../model/UserModel";
import AdminModel from "../model/AdminModel";
import { Request,Response } from "express";
import bcrypt, { hash } from "bcrypt"
import cloud from "../cloudinary/cloudinary"
import mongoose from "mongoose"
import AllUserModel from "../model/AlluSER";
import bottleWaterModel from "../model/bottleWaterModel";
import PureWaterModel from "../model/bottleWaterModel";
import BottlewaterproductModel from "../model/userBottleWater"
import UserhistoryModel from "../model/UserHistoryModel";
import UsermessageModel from "../model/UsermessageModel";

const getOneUser = async(req:Request,res:Response)=>{
    try {
        const getOne = userModel.findById(req.params.id).populate({path:"userModel"})
        return res.status(200).json({
            message:"Successfully got one user",
            data:getOne
        })
    } catch (error) {
        return res.status(400).json({
            message:"Couldn't get single user"
        }) 
    }
}

const RegisterUser=async(req:Request,res:Response)=>{
    try {
        const{name,email,password,phoneNumber,Address}= req.body;
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)
        const genId = Math.floor(Math.random()* 20) + "qdft"
        // const cloudinary = await cloud.uploader?.upload(req?.file?.path)
        const reg =  await userModel.create({
            name,
            email,
            password:hash,
            phoneNumber,
            Address,
            // profileImage : req.file?.path,
            balance:1000,
        })
        const user = await BottlewaterproductModel.create({
            _id:reg?._id,
            pureWaterQty:0,
            pureWaterAmount:0,
            Totalamount:0,
       })
       reg?.bottleWater?.push(new mongoose.Types.ObjectId(user?._id))
       reg?.save()
        return res.status(201).json({
            message:"user created",
            data:reg,
        })
    } catch (error) {
        return res.status(400).json({
            message:"user not created",
            data:error
        })
    }
}
const LoginUser=async(req:Request,res:Response)=>{
    try {
           const {email,password} = req.body
           const getEmail = await userModel.findOne({email})
           const getPassword = await userModel.findOne({password})
           if(getEmail){
            return res.status(200).json({
                message:`welcome back ${getEmail.name}`,
                data:getEmail  
            })
           }else{
            return res.status(400).json({
                message:"email or password is incorrect",
            })
           }
    } catch (error) {
        return res.status(401).json({
            message:"an error occured"
        })
    }
}
const OrderPureWater = async (req:Request,res:Response):Promise<Response>=>{
    try {
    const {accountNumber,bottleWaterQty,bottleWaterAmount} = req.body;
    const users =await  userModel.findById(req.params.userId)
    const admin = await AdminModel.findOne({accountNumber})
    const adminBottle = await PureWaterModel.findById(admin?._id)
    const userBottle = await BottlewaterproductModel.findById(users?._id)
    const dater = new Date()
    const refNumber = Math.floor(Math.random()* 12329393) + 12234455
   if(users){
       if(users?.balance < adminBottle?.bottleWaterAmount! * bottleWaterQty){
         return res.status(404).json({
            message:"insufficient fund or quantity is not available"
         })
       }else{
       if( bottleWaterQty <= adminBottle?.bottleWaterQty!){
        await AdminModel.findByIdAndUpdate(admin?._id,{
            balance : admin?.balance! + (bottleWaterQty! * adminBottle?.bottleWaterAmount!)
        })
         await PureWaterModel.findByIdAndUpdate(adminBottle?._id,{
            bottleWaterQty : adminBottle?.bottleWaterQty! - bottleWaterQty
         })
         await userModel.findByIdAndUpdate(users?._id,{
            balance : users?.balance - (bottleWaterQty! * adminBottle?.bottleWaterAmount!)
         })
         await BottlewaterproductModel.create({
            pureWaterQty : + bottleWaterQty,
            bottleWaterAmount : adminBottle?.bottleWaterAmount,
            Totalamount:bottleWaterQty! * adminBottle?.bottleWaterAmount!,
            
         })
         users?.bottleWater?.push(new mongoose.Types.ObjectId(userBottle?._id))
         users?.save();
         const historys = await UserhistoryModel.create({
            message:`${users?.name} you have successfully ordered for this product`,
            quantityProduct:userBottle?.bottleWaterQty + bottleWaterQty,
            totalPrice:bottleWaterQty! * adminBottle?.bottleWaterAmount!,
            DateOfOrder:dater,
            referrenceNumber:refNumber,
         })
        users?.history?.push(new mongoose.Types.ObjectId(historys?._id))
        users?.save();
         return res.status(200).json({
            message:`goods successfully bought by ${users?.name}`,
            data:userBottle,
         })
       }else{
        return res.status(400).json({
            message:"quantity is not available"
        })
       }
       }
   }else{
        return res.status(404).json({
            message:"unauthorize user"
        })
   }
    } catch (error) {
       return res.status(400).json({
            message:error
        })
    }
}
const OrderBottleWater = async (req:Request,res:Response):Promise<Response>=>{
    try {
    const {accountNumber,bottleWaterQty,bottleWaterAmount} = req.body;
    const users =await  userModel.findById(req.params.userId)
    const admin = await AdminModel.findOne({accountNumber})
    const adminBottle = await bottleWaterModel.findById(admin?._id)
    const userBottle = await BottlewaterproductModel.findById(users?._id)
    const dater = new Date()
    const refNumber = Math.floor(Math.random()* 12329393) + 12234455
   if(users){
       if(users?.balance < adminBottle?.bottleWaterAmount! * bottleWaterQty){
         return res.status(404).json({
            message:"insufficient fund or quantity is not available"
         })
       }else{
       if( bottleWaterQty <= adminBottle?.bottleWaterQty!){
        await AdminModel.findByIdAndUpdate(admin?._id,{
            balance : admin?.balance! + (bottleWaterQty! * adminBottle?.bottleWaterAmount!)
        })
         await bottleWaterModel.findByIdAndUpdate(adminBottle?._id,{
            bottleWaterQty : adminBottle?.bottleWaterQty! - bottleWaterQty
         })
         await userModel.findByIdAndUpdate(users?._id,{
            balance : users?.balance - (bottleWaterQty! * adminBottle?.bottleWaterAmount!)
         })
         await BottlewaterproductModel.create({
            pureWaterQty : + bottleWaterQty,
            bottleWaterAmount : adminBottle?.bottleWaterAmount,
            Totalamount:bottleWaterQty! * adminBottle?.bottleWaterAmount!,
            
         })
         users?.bottleWater?.push(new mongoose.Types.ObjectId(userBottle?._id))
         users?.save();
         const historys = await UserhistoryModel.create({
            message:`${users?.name} you have successfully ordered for this product`,
            quantityProduct:userBottle?.bottleWaterQty + bottleWaterQty,
            totalPrice:bottleWaterQty! * adminBottle?.bottleWaterAmount!,
            DateOfOrder:dater,
            referrenceNumber:refNumber,
         })
        users?.history?.push(new mongoose.Types.ObjectId(historys?._id))
        users?.save();
         return res.status(200).json({
            message:`goods successfully bought by ${users?.name}`,
            data:userBottle,
         })
       }else{
        return res.status(400).json({
            message:"quantity is not available"
        })
       }
       }
   }else{
        return res.status(404).json({
            message:"unauthorize user"
        })
   }
    } catch (error) {
       return res.status(400).json({
            message:error
        })
    }
}
const MessageAdmin = async(req:Request,res:Response)=>{
    try {
        const {time,text,profileImage} = req.body;
    const user= await userModel.findById(req.params.id)
    const admin = await AdminModel.findById(req.params.admin)
    const dater = new Date().toDateString()
    if(user){
        const messages = await UsermessageModel.create({
            time : dater,
            text,
        })
          user?.message?.push(new mongoose.Types.ObjectId(messages?._id))
          user?.save();
          admin?.message?.push(new mongoose.Types.ObjectId(messages?._id))
          admin?.save();
          return res.status(200).json({
            messageee:"message sent",
        })
    }else{
        return res.status(401).json({
            message:"sth came up"
        })
    }
    
    } catch (error) {
       return res.status(404).json({
        messageee:"cant send message"
       })
    }
}
export {RegisterUser,LoginUser,OrderPureWater,OrderBottleWater,MessageAdmin}