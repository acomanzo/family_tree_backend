const express = require('express');
const contactInformationController = require('../controllers/contactInformationController.js');

const router = express.Router();

router.get('/', contactInformationController.contact_information_index);

router.post('/', contactInformationController.contact_information_create);

router.delete('/:id', contactInformationController.contact_information_delete);

module.exports = router;