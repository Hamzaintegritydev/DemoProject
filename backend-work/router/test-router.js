const express = require('express');
const router = express.Router();
const testController = require('../controller/test-controller');
router.post('/createTest', testController.createTest);
module.exports = router;