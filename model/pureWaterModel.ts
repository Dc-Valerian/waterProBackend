import mongoose from "mongoose";
interface Product{
    pureWaterQty:number,
    pureWaterAmount:number,
    Totalamount:number,
}
interface Iproduct extends Product, mongoose.Document{}
const productSchema=new mongoose.Schema({
    pureWaterQty:{
        type:Number,
        default:0,
       },
       pureWaterAmount:{
        type:Number,
        default:0,
       },
       Totalamount:{
        type:Number,
        default:0,
       },
})
const PurewaterproductModel=mongoose.model<Iproduct>("purewater",productSchema)
export default PurewaterproductModel