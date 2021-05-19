const express = require('express');
const zipcodeController = require('../controllers/zipcodeController.js');

const router = express.Router();

router.get('/', zipcodeController.zipcode_index);

router.post('/', zipcodeController.zipcode_create);

// router.delete('/:id', zipcodeController.zipcode_delete);

// router.patch('/:id', zipcodeController.zipcode_update);

module.exports = router;