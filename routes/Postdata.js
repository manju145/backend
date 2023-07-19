const express = require('express');
const InveModel = require('../middleware/Auth.middlewares');
const inventRouter = express.Router();



inventRouter.post('/add', async (req, res) => {
  try {
    const {
      carModel,
      odometerKMs,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
      image,
      des,
      oemId,
      userId,
    } = req.body;

    const newInventory = new InveModel({
      carModel,
      odometerKMs,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
      image,
      des,
      oemId,
      userId,
    });

    await newInventory.save();
    res.status(201).json({ msg: 'Created Successfully', newInventory });
  } catch (err) {
    res.status(500).json({"msg":err.message});
  }
});


inventRouter.get('/', async (req, res) => {
    const { listPrice, color, mileage, userId } = req.query;
    try {
      let query = {};
      if (userId) {
        query.userId = userId;
      }
      let inventory = await InveModel.find(query).populate('oemId');
      if (listPrice) {
        const priceRegex = new RegExp(listPrice);
        inventory = inventory.filter(item => priceRegex.test(item.oemId.listPrice));
      }
      if (color) {
        inventory = inventory.filter(item => item.oemId.colors.includes(color));
      }
      if (mileage) {
        const mileageRegex = new RegExp(mileage);
        inventory = inventory.filter(item => mileageRegex.test(item.oemId.mileage));
      }
      res.status(200).json({ data: inventory });
    } catch (err) {
      res.status(500).json({"msg":err.message});
    }
  });


  inventRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await InveModel.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({"msg":err.message});
  }
});

inventRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      carModel,
      odometerKMs,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
      image,
      des,
      oemId,
      userId,
    } = req.body;

    const updatedInventory = await InveModel.findByIdAndUpdate(
      id,
      {
        carModel,
        odometerKMs,
        majorScratches,
        originalPaint,
        accidentsReported,
        previousBuyers,
        registrationPlace,
        image,
        des,
        oemId,
        userId,
      },
      { new: true }
    );

    res.status(200).json({ msg: ' Updated Successfully', updatedInventory });
  } catch (err) {
    res.status(500).json({"msg":err.message});
  }
});

module.exports = inventRouter;