const router = require('express').Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require ('./users.controller');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser)
router.post('/', createUser);
router.patch('/:id', updateUser)

module.exports = router;