import AdminModel from "../model/AdminModel";
import userModel from "../model/UserModel";
import bcrypt from "bcrypt"
import { Request,Response } from "express";
import mongoose from "mongoose"
import bottleWaterModel from "../model/bottleWaterModel";
import PurewaterproductModel from "../model/pureWaterModel";

const RegisterAdmin=async(req:Request,res:Response)=>{
    try {
        const{name,email,password}= req.body;
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
            bottleWaterQty:0,
            bottleWaterAmount:0,
            // Totalamount:bottleWaterAmount * bottleWaterQty,
        })
        reg?.bottleWater?.push(new mongoose.Types.ObjectId(createBottle?._id))
        reg?.save()
        const createpureWater = await PurewaterproductModel.create({
            _id:reg._id,
            bottleWaterQty:0,
            bottleWaterAmount:0,
            Totalamount:0,
        })
        reg?.pureWater?.push(new mongoose.Types.ObjectId(createpureWater?._id))
        // reg?.save()
        return res.status(201).json({
            message:"user created",
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
                message:`welcome back Boss`,
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
export {RegisterAdmin,LoginAdmin,PostBottleWater,PostPureWater}