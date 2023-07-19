const mongoose = require('mongoose');
const oemSpecsModel = require('../model/specs')
const UserModel=require("../model/user")


const Schema = new mongoose.Schema({
  carModel: String,
  odometerKMs: Number,
  majorScratches: Boolean,
  originalPaint: Boolean,
  accidentsReported: Number,
  previousBuyers: Number,
  registrationPlace: String,
  image: String,
  des:Array,
  oemId: { type: mongoose.Schema.Types.ObjectId, ref: oemSpecsModel },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
});

const InveModel = mongoose.model('Inventory', Schema);

module.exports = InveModel;