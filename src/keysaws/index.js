const router = require('express').Router();
const { getAllKeys, getKeyById,createKeys/*,updateUser, deleteUser*/ } = require ('./keyaws.controller');
module.exports = router;
console.log("1")
router.get('/', getAllKeys);
router.get('/:id', getKeyById);
// router.delete('/:id', deleteUser)
router.post('/', createKeys);
// router.patch('/:id', updateUser)
// router.get('/', )
// module.exports = router;