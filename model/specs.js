const mongoose = require('mongoose');

const SpecsSchema = new mongoose.Schema({
  model: String,
  year: Number,
  listPrice: Number,
  colors: [String],
  mileage: Number,
  power: Number,
  maxSpeed: Number,
});

const SpecsModel = mongoose.model('OEMSpecs', SpecsSchema);

module.exports = SpecsModel;