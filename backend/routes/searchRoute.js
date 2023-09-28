const express = require('express');
const Data = require('../models/data');
const router = express.Router();

router.post('/add_data', async (req, res) => {
  try {
    const data = new Data({
      data: req.body.data
    });
    await data.save();
    res.status(201).send('data inserted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get('/get_data', async (req, res) => {
    try {
        const allData = await Data.find({});
        res.json(allData);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }); 

module.exports = router;
