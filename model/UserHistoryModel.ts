import mongoose from "mongoose";
interface history{
    message:string,
    pureWater:number,
    bottleWater:number,
    quantityProduct:number,
    referrenceNumber:number,
    totalPrice:number,
    DateOfOrder:string,
}
interface Ihistory extends history, mongoose.Document{}
const historySchema= new mongoose.Schema({
    message:{
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
    referrenceNumber:{
        type:Number
    },
    totalPrice:{
        type:Number
    },
    DateOfOrder:{
        type:String
    },
})
const UserhistoryModel = mongoose.model<Ihistory>("history",historySchema)  
export default UserhistoryModel