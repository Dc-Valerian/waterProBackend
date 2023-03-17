import mongoose from "mongoose";

interface Admin{
    name:string,
    email:string,
    password:string,
    phoneNumber:number,
    Address:string,
    accountNumber:number,
    message:{}[] | any,
    isAdmin:boolean,
    bottleWater:{}[],
    pureWater:{}[],
    Totalprice:number,
    balance:number,
    TotalSumOfTheDay:number,
    status:boolean,
    Records:{}[],
    AllRegisterUser:{}[],
    deliverd:boolean,
    history:{}[],
    Product:{}[],
    ReturnProduct:{}[],
}
interface Iadmin extends Admin,mongoose.Document{}
const AdminSchema =new mongoose.Schema({
   name:{
    type:String,
    required:[true,"please enter your name"]
   },
   email:{
    type:String,
    required:[true,"please enter your email"],
    unique:true,
    lowercase:true,
    trim:true
   },
   password:{
    type:String,
    required:[true,"please enter your password"]
   },
   accountNumber:{
    type:Number,
   },
   status:{
    type:Boolean,
    default :true,
   },
   balance:{
    type:Number,
   },
   bottleWater:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"bottlewater"
   }],
   pureWater:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"purewater"
   }],
   Totalprice:{
    type:Number,
    // required:[true,"please enter your pureWaterQty"]
   },
   TotalSumOfTheDay:{
    type:Number,
    // required:[true,"please enter your pureWaterQty"]
   },
   AllRegisterUser:[{
    type:mongoose.Schema.Types.ObjectId,
     ref:"alluser"
   }],
   isAdmin:{
    type:Boolean,
    default :true,
   },
   deliverd:{
    type:Boolean,
    default :false,
   },
   message:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"messages"
    }
   ],
   history:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"history"
    }
   ],
   product:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }
   ],
   Records:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"records"
    }
   ],
   ReturnProduct:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"return"
    }
   ],
},{timestamps:true})
const AdminModel = mongoose.model<Iadmin>("adminModel",AdminSchema)
export default AdminModel