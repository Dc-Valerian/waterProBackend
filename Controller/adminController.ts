import AdminModel from "../model/AdminModel";
import userModel from "../model/UserModel";
import bcrypt from "bcrypt"
import { Request,Response } from "express";
import mongoose from "mongoose"
import bottleWaterModel from "../model/bottleWaterModel";
import PurewaterproductModel from "../model/pureWaterModel";
import AdminmessageModel from "../model/AdminMessageModel";
import UsermessageModel from "../model/UsermessageModel";

const RegisterAdmin=async(req:Request,res:Response)=>{
    try {
        const{name,email,password,bottleWaterQty,bottleWaterAmount,pureWaterQty,pureWaterAmount}= req.body;
        const genAccountNumber = Math.floor(Math.random() * 60) * Math.floor(Math.random() * 60) + 1234
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)
        const reg =  await AdminModel.create({
            name,
            email,
            password:hash,
            balance:1000,
            accountNumber:genAccountNumber,
        })
        const createBottle = await bottleWaterModel.create({
            _id:reg._id,
            bottleWaterQty,
            bottleWaterAmount,
            // Totalamount:bottleWaterAmount * bottleWaterQty,
        })
        reg?.bottleWater?.push(new mongoose.Types.ObjectId(createBottle?._id))
        reg?.save()
        const createpureWater = await PurewaterproductModel.create({
            _id:reg._id,
            pureWaterQty,
            pureWaterAmount,
            Totalamount:0,
        })
        reg?.pureWater?.push(new mongoose.Types.ObjectId(createpureWater?._id))
        reg?.save()
        return res.status(201).json({
            message:`Admin Created ${reg.name}`,
            data:reg,
        })
    } catch (error) {
        return res.status(400).json({
            message:"user not created"
        })
    }
}
const PostPureWater=async(req:Request,res:Response)=>{
    try {
        const {bottleWaterQty,bottleWaterAmount,Totalamount} = req.body
        const sth = await PurewaterproductModel.findById(req.params.id)
        const updateBottle = await PurewaterproductModel.findByIdAndUpdate(sth?._id,{
            bottleWaterQty,
            bottleWaterAmount,
            Totalamount : bottleWaterQty * bottleWaterAmount,
        })
        return res.status(200).json({
            message:"bottle water updated",
            data:updateBottle,
        })
    } catch (error) {
        return res.status(401).json({
            message:"an error occured"
        })
    }
}
const PostBottleWater=async(req:Request,res:Response)=>{
    try {
        const {bottleWaterQty,bottleWaterAmount,Totalamount} = req.body
        const sth = await bottleWaterModel.findById(req.params.id)
        const updateBottle = await bottleWaterModel.findByIdAndUpdate(sth?._id,{
            bottleWaterQty,
            bottleWaterAmount,
            Totalamount : bottleWaterQty * bottleWaterAmount,
        })
        return res.status(200).json({
            message:"bottle water updated",
            data:updateBottle,
        })
    } catch (error) {
        return res.status(401).json({
            message:"an error occured"
        })
    }
}
const LoginAdmin=async(req:Request,res:Response)=>{
    try {
           const {email,password} = req.body
           const getEmail = await AdminModel.findOne({email})
           if(getEmail){
            return res.status(200).json({
                message:`Welcome back ${getEmail.name}`,
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
const MessageUser = async(req:Request,res:Response)=>{
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
const GetAllProducts = async(req:Request,res:Response)=>{
    try {
        const getAllProduct = await bottleWaterModel.find()

        return res.status(200).json({
            message:"Successfully got all Products",
            data:getAllProduct
        })
    } catch (error) {
        return res.status(404).json({
            messageee:"Couldn't Get Products"
           }) 
    }
}
export {RegisterAdmin,LoginAdmin,PostBottleWater,PostPureWater,MessageUser,GetAllProducts}