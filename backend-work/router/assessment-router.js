const express = require('express');
const router = express.Router();
const assessmentController = require('../controller/assessment-controller');
router.post('/createAssesment', assessmentController.createAssessment);
    
router.get('/allAssesment',assessmentController.getAllAssesment);


module.exports = router;