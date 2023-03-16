import mongoose from "mongoose"
interface Message{
    time:string,
    text:string,
    profileImage:string,
}
interface Imessage extends Message, mongoose.Document{}
const messageSchema=new mongoose.Schema({
    time:{
        type:String
    },
    text:{
        type:String
    },
    profileImage:{
        type:String
    },
})
const AdminmessageModel = mongoose.model<Imessage>("message",messageSchema)
export default AdminmessageModel