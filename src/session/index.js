const router = require('express').Router();
const controller = require ('./session.controller');

router.get('/', controller.createCookie)
//router.post('/', controller.saveSessionOnUser)

module.exports = router