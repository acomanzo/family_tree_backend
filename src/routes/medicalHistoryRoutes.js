const express = require('express');
const medicalHistoryController = require('../controllers/medicalHistoryController.js');

const router = express.Router();

router.get('/', medicalHistoryController.medical_history_index);

router.get('/familymember', medicalHistoryController.medical_history_index_by_family_member);

router.post('/', medicalHistoryController.medical_history_create);

router.delete('/:id', medicalHistoryController.medical_history_delete);

router.patch('/:id', medicalHistoryController.medical_history_update);

router.patch('/:id/datediagnosed', medicalHistoryController.medical_history_update_date_diagnosed);

router.patch('/:id/note', medicalHistoryController.medical_history_update_note);

router.patch('/:id/diagnosisid', medicalHistoryController.medical_history_update_diagnosis_id);

module.exports = router;