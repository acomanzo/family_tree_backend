const express = require('express');
const phoneNumberController = require('../controllers/phoneNumberController.js');

const router = express.Router();

router.get('/', phoneNumberController.phone_number_index);

router.post('/', phoneNumberController.phone_number_create);

router.delete('/:id', phoneNumberController.phone_number_delete);

router.patch('/:id', phoneNumberController.phone_number_update);

module.exports = router;