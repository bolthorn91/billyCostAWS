const router = require('express').Router();
const controller = require('./controller.api')

module.exports = router;

router.get('/', controller.getBillByKeyFake)
router.get('/real/daily', controller.getBillByKey)
router.get('/real/monthly', controller.getBillByKey)