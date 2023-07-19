const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true},
pass:{type:String,required:true},

image:{type:String,required:true},
title:{type:String,required:true},
dec:{type:String,required:true},
color:{type:String,required:true},
price:{type:Number,required:true},
mileage:{type:Number,required:true},
},{
    versionKey:false
})


const UserModel= mongoose.model("user",userSchema)

module.exports={
    UserModel
}

