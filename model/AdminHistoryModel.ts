import mongoose from "mongoose";
interface history{
    name:string,
    address:string,
    pureWater:number,
    bottleWater:number,
    quantityProduct:number,
    totalPrice:number
}
interface Ihistory extends history, mongoose.Document{}
const historySchema= new mongoose.Schema({
    name:{
        type:String
    },
    address:{
        type:String
    },
    pureWater:{
        type:String
    },
    bottleWater:{
        type:String
    },
    quantityProduct:{
        type:Number
    },
    totalPrice:{
        type:Number
    },
})
const AdminhistoryModel = mongoose.model<Ihistory>("history",historySchema)
export default AdminhistoryModel