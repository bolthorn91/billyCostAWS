const router = require('express').Router();
const { getAllKeys, getLastKey, getKeyById,createKeys/*,updateUser, deleteUser*/ } = require ('./keyaws.controller');

router.get('/', getAllKeys);
router.get('/last', getLastKey);
router.get('/:id', getKeyById);
// router.delete('/:id', deleteUser)
router.post('/', createKeys);
// router.patch('/:id', updateUser)

module.exports = router;