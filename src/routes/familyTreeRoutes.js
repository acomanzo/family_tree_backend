const express = require('express');
const familyTreeController = require('../controllers/familyTreeController.js');

const router = express.Router();

router.get('/', familyTreeController.family_tree_index);

router.post('/', familyTreeController.family_tree_create);

router.get('/share', familyTreeController.family_tree_index_share);

router.post('/share', familyTreeController.family_tree_share);

router.delete('/:id', familyTreeController.family_tree_delete);

module.exports = router;