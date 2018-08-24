const router = require('express').Router();
const { createUser, validateEmail,sessionUser } = require ('./users.controller');


router.post('/', createUser);
router.post('/login', sessionUser);
router.get('/validate/:id', validateEmail);
//router.patch('/:id', updateUser);

module.exports = router;