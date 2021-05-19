const express = require('express');
const familyMemberController = require('../controllers/familyMemberController.js');

const router = express.Router();

router.get('/', familyMemberController.family_member_index);

router.get('/:id', familyMemberController.family_member_index_by_tree);

router.post('/', familyMemberController.family_member_create);

router.delete('/:id', familyMemberController.family_member_delete);

router.patch('/:id', familyMemberController.family_member_update);

module.exports = router;