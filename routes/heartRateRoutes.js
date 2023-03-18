const express = require('express');
const heartRatesService = require('../services/heartRatesService');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await heartRatesService.getData();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/aggregate', async (req, res) => {
    try {
      const data = await heartRatesService.aggregateHeartRates();
      res.send(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

  //assumptions
  router.get('/aggregate/store', async (req, res) => {
    try {
      const data = await heartRatesService.saveHeartRateData();
      res.send(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });  

module.exports = router;
