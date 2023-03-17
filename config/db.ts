import mongoose from "mongoose"
const URI = "mongodb://127.0.0.1/WaterProject"
// const URI = "mongodb+srv://valerianpedro:valerianpedro@cluster0.ngujblg.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(URI)
mongoose.connection.on("open",()=>{
    console.log("db is on")
}).once("error",()=>{
    console.log("an error occ")
})