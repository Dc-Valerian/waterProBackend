import mongoose from "mongoose"
interface Records{
    date:string,
    totalAmount:number,
    pureWaterTotalAmount:number,
    pureWaterTotalProduct:number,
    bottleWaterTotalAmount:number,
    bottleWaterTotalProduct:number,
    returnProduct:{}[],
}
interface Irecords extends Records, mongoose.Document{}
const RecordSchema =new mongoose.Schema({
    date:{
        type : String
    },
    totalAmount:{
        type : Number
    },
    pureWaterTotalAmount:{
        type : Number
    },
    pureWaterTotalProduct:{
        type : Number
    },
    bottleWaterTotalAmount:{
        type : Number
    },
    bottleWaterTotalProduct:{
        type : Number
    },
    returnProduct:[
        {
            type:mongoose.Schema.Types.ObjectId
        }
    ]
})
const RecordsModel= mongoose.model<Irecords>("records",RecordSchema)
export default RecordsModel