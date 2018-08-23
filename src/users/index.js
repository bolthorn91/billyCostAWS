const router = require('express').Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, validateEmail,sessionUser } = require ('./users.controller');

router.get('/', getAllUsers);
//router.get('/:id', getUserById);
//router.delete('/:id', deleteUser)
router.post('/', createUser);
router.post('/login', sessionUser);
router.get('/validate/:id', validateEmail);
router.patch('/:id', updateUser);

module.exports = router;