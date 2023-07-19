const express = require("express");
const {connection} = require("./db")
const {userRouter} = require("./routes/User.routes")

const {auth} = require("./middleware/auth.middleware")
const {noteRouter} =require("./routes/Notes.route")
require("dotenv").config()

const app = express();

app.use(express.json());
app.use("/users",userRouter)


app.use(auth)
app.use("/notes",noteRouter)


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