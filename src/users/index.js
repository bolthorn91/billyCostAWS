const router = require('express').Router();
const { createUser, validateEmail, sessionUser,getUsers } = require ('./users.controller');


router.get('/', getUsers);
router.post('/', createUser);
router.post('/login', sessionUser);
router.get('/validate/:id', validateEmail);
//router.patch('/:id', updateUser);

module.exports = router;