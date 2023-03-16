import mongoose from "mongoose"
const URI = "mongodb://127.0.0.1/WaterProject"
mongoose.connect(URI)
mongoose.connection.on("open",()=>{
    console.log("db is on")
}).once("error",()=>{
    console.log("an error occ")
})