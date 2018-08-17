const router = require('express').Router();
const controller = require('./controller.api')

module.exports = router;

router.get('/', controller.getBillByKey)