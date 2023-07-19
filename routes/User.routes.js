const express = require("express");
const { UserModel } = require("../model/User.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express.Router()


userRouter.post('/register', async (req, res) => {
    const { name,email,pass } = req.body;
  
    try {
      const user = await UserModel.findOne({ email });
      
      if (user) {
        res.send('User already exists.');
      } else {
          bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
              res.send({ err: err.message });
            } else {
              const newUser = new UserModel({ name,email, pass: hash });
              await newUser.save();
              res.send('Registered Successfully!');
            }
          });
        }
      }
     catch (err) {
      res.send({ msg: err.message });
    }
  });

  userRouter.post('/addcar', async (req, res) => {
    const { name,email,image,title,dec,color,price,mileage,pass } = req.body;
  
    try {
      const user = await UserModel.findOne({ email });
      
      if (user) {
        res.send('User already exists.');
      } else {
          bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
              res.send({ err: err.message });
            } else {
              const newUser = new UserModel({ name,email,image,title,dec,color,price,mileage,pass:hash});
              await newUser.save();
              res.send('Add Car Successfully!');
            }
          });
        }
      }

     catch (err) {
      res.send({ msg: err.message });
    }
  });

userRouter.post("/login",async(req,res)=>{
    const{email,pass}=req.body;
    try{
        const user= await UserModel.findOne({email});
        if(user){
            bcrypt.compare(pass,user.pass,(err, result)=> {
                 if(result){
                    res.send({"msg":"Login Successfull !!","token":jwt.sign({"userID":user._id}, "masai")});
                 }else{
                    res.send("Wrong Credentials !!");
                 }
            });
        }else{
            res.send("Please Register First !!");
        }
    }catch(err){
        res.send({"msg":err.message});
    }
 })

module.exports = {
    userRouter
}