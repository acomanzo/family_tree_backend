const express = require('express');
const stateController = require('../controllers/stateController.js');

const router = express.Router();

router.get('/', stateController.state_index);

router.post('/', stateController.state_create);

module.exports = router;