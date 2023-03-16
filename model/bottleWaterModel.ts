import mongoose from "mongoose";
interface Product{
    bottleWaterQty:number,
    bottleWaterAmount:number,
    Totalamount:number,
}
interface Iproduct extends Product, mongoose.Document{}
const productSchema=new mongoose.Schema({
    bottleWaterQty:{
        type:Number,
        // default:0,
       },
       bottleWaterAmount:{
        type:Number,
        // default:0,
       },
       Totalamount:{
        type:Number,
        // default:0,
       },
})
const bottleWaterModel=mongoose.model<Iproduct>("bottlewater",productSchema)
export default bottleWaterModel