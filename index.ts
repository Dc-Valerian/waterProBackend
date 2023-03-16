import express,{Application} from "express"
import router from "./Router/userRouter"
import routers from "./Router/adminRouter"
import morgan from "morgan"
const PORT:number= 2244
const app:Application = express()
app.use(express.json())
app.get("/",()=>{
    console.log("get method is working")
})
require("./config/db")
app.use("/api",router)
app.use("/api/admin",routers)
app.use(morgan("dev"))
app.listen(PORT,()=>{
    console.log("server is up on.....")
})