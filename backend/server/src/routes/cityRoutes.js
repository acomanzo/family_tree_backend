const express = require('express');
const cityController = require('../controllers/cityController.js');

const router = express.Router();

router.get('/', cityController.city_index);

router.post('/', cityController.city_create);

module.exports = router;