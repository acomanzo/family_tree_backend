const express = require('express');
const contactAddressController = require('../controllers/contactAddressController.js');

const router = express.Router();

router.get('/', contactAddressController.contact_address_index);

router.post('/', contactAddressController.contact_address_create);

router.delete('/:id', contactAddressController.contact_address_delete);

router.patch('/:id', contactAddressController.contact_address_update);

router.patch('/:id/streetname', contactAddressController.contact_address_update_street_name);

router.patch('/:id/housenumber', contactAddressController.contact_address_update_house_number);

router.patch('/:id/extra', contactAddressController.contact_address_update_extra);

router.patch('/:id/cityid', contactAddressController.contact_address_update_city_id);

router.patch('/:id/stateid', contactAddressController.contact_address_update_state_id);

router.patch('/:id/zipcodeid', contactAddressController.contact_address_update_zipcode_id);

module.exports = router;