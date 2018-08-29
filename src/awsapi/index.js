const router = require('express').Router();
const controller = require('./controller.api')

module.exports = router;

router.get('/', controller.getBillByKeyFake)
router.post('/day', controller.getBillByDay)
router.get('/month', controller.getBillByMonth)
router.get('/allmonth', controller.getAllBillFake)

