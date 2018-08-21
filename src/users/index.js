const router = require('express').Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, validateEmail, validateSession } = require ('./users.controller');

// router.get('/', getAllUsers);
// router.get('/:id', getUserById);
router.delete('/:id', deleteUser)
router.post('/', createUser);
router.get('/validate/:id', validateEmail);
router.post('/session', validateSession)
router.patch('/:id', updateUser)
module.exports = router;