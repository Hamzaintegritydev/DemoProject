const express = require('express');
const router = express.Router();
const attemptedAssessment = require('../controller/attempted-assesment-controller');
router.post('/createAttemptedAssessment', attemptedAssessment.createAttemptedAssessment);
router.get('/find/:id',attemptedAssessment.getAssesmentById);


module.exports = router;