import mongoose from "mongoose"
const URI = "mongodb+srv://ValerianPedro:ValerianPedro@cluster0.ngujblg.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(URI)
mongoose.connection.on("open",()=>{
    console.log("db is on")
}).once("error",()=>{
    console.log("an error occ")
})