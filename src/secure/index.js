const router = require('express').Router();
const { createKeys,updateUser, deleteUser, deleteKeys } = require ('./secure.controller');

router.delete('/users/:id', deleteUser)
router.patch('/keys/:id', createKeys);
router.patch('/keysd/:id', deleteKeys);
router.patch('/users/:id', updateUser)


module.exports = router;