const express = require('express');
const emailController = require('../controllers/emailController.js');

const router = express.Router();

router.get('/', emailController.email_index);

router.post('/', emailController.email_create);

router.delete('/:id', emailController.email_delete);

router.patch('/:id', emailController.email_update);

module.exports = router;