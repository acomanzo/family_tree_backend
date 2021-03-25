const express = require('express');
const ancestorDescendantController = require('../controllers/ancestorDescendantController.js');

const router = express.Router();

router.get('/', ancestorDescendantController.ancestor_descendant_index);

router.post('/', ancestorDescendantController.ancestor_descendant_create);

router.delete('/:id', ancestorDescendantController.ancestor_descendant_delete);

// router.patch('/:id', ancestorDescendantController.ancestor_descendant_update);

module.exports = router;