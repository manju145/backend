const express = require('express');
const SpecsModel = require('../model/specs');



const SpecsRouter = express.Router();


SpecsRouter.post('/add', async (req, res) => {
    const { model, year, listPrice, colors, mileage, power, maxSpeed } = req.body;
  
    try {
      const newSpecs = new SpecsModel({
        model,
        year,
        listPrice,
        colors,
        mileage,
        power,
        maxSpeed,
      });
  
      await newSpecs.save();
      res.status(201).json({ msg: 'specs Added Successfully', newSpecs });
    } catch (err) {
      res.status(500).json({"msg":err.message});
    }
  });



  
  module.exports = SpecsRouter;