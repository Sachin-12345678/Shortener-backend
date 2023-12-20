const express=require("express");
const app=express();
const connection=require("./db");
const {userRouter}=require("./routes/User.routes")
const Shortrouter=require("./routes/url.routes")
const {authenticate}=require("./middlewares/authenticate.middleware")

const cors=require("cors")
require("dotenv").config()

app.use(express.json());
app.use(cors())

app.get("/", (req,res)=>{
    res.send("Home page here............")
})

app.use("/",userRouter)
app.use("/",Shortrouter)
app.use(authenticate)

app.listen(process.env.port, async()=>{
   try{
       await connection
       console.log("Connected to DB");
   }catch(err){
       console.log(err)
   }
   console.log(`Server is running on port ${process.env.port}`);
})
