const express = require('express');
const router = express.Router();
const testController = require('../controller/test-controller');
const { updateTest } = require('../controller/test-controller');


router.post('/createTest', testController.createTest);
router.put('/tests/:testId',updateTest)

module.exports = router;