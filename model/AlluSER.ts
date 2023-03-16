import mongoose from "mongoose"

interface AllUser{
    name:string,
    email:string,
    profileImage:string,
}
interface IallUser extends AllUser, mongoose.Document{}
const AllUserSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    profileImage:{
        type:String,
    }
})
const AllUserModel = mongoose.model<IallUser>("alluser",AllUserSchema)
export default AllUserModel