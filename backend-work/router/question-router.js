const express = require('express');
const questionController = require('../controller/question-controller');
const router = express.Router();
// Create a question
router.post('/question', questionController.createQuestion);
module.exports = router;