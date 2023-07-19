const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const userRouter = require("../Backend/routes/user")
const inventRouter = require("../Backend/routes/Postdata")
const SpecsRouter = require("../Backend/routes/auth")


const app = express()
app.use(express.json())
app.use(cors())


app.use("/user",userRouter)
app.use("/invent",inventRouter)
app.use("/specs",SpecsRouter)

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(async()=>{
    try{
await connection
console.log("Connect to the DB")
    }
    catch(err){
console.log(err)
console.log("can not connect to the DB")
    }
    console.log(`Server is runing at port ${process.env.port}`);
})


// app.listen(8080,async()=>{
//     try{
//         await connection;
//         console.log("Connection with db");
//     }catch(err){
//         console.log("server is running at port 8080");
//     }
// })