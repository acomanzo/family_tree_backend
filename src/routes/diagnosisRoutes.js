const express = require('express');
const diagnosisController = require('../controllers/diagnosisController.js');

const router = express.Router();

router.get('/', diagnosisController.diagnosis_index);

router.post('/', diagnosisController.diagnosis_create);

// router.delete('/:id', diagnosisController.diagnosis_delete);

// router.patch('/:id', diagnosisController.diagnosis_update);

module.exports = router;