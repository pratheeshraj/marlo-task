const express=require("express")
const UserRouter=require("./Routers/userRouter")
const Error = require("./middleware/error")
const cookieparser=require("cookie-parser")
const app=express()
app.use(cookieparser())
app.use(express.json())

app.use("/api",UserRouter)

app.get("/",async(req,res)=>{
    res.send("raj")
})

app.use(Error)
module.exports=app