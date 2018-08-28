const router = require('express').Router();
const controller = require('./controller.api')

module.exports = router;

router.get('/', controller.getBillByKeyFake)
router.get('/day', controller.getBillByDay)
router.get('/month', controller.getBillByMonth)


