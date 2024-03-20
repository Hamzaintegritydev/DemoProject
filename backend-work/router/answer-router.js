const express = require('express');
const router = express.Router();
const { createAnswer, verifyAnswer } = require('../controller/answer-controller');
router.post('/createAns', createAnswer);
router.put('/verify', verifyAnswer);
module.exports = router;