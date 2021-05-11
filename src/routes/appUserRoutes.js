const express = require('express');
const appUserController = require('../controllers/appUserController.js');

const router = express.Router();

router.get('/', appUserController.app_user_index);

router.post('/', appUserController.app_user_create);

router.delete('/:id', appUserController.app_user_delete);

router.post('/login', appUserController.app_user_login);

module.exports = router;