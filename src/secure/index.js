const router = require('express').Router();
const { createKeys,updateUser, deleteUser, deleteKeys, getUserById } = require ('./secure.controller');

router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUser);
router.patch('/keys/:id', createKeys);
router.patch('/keysd/:id', deleteKeys);
router.patch('/users/:id', updateUser);



module.exports = router;