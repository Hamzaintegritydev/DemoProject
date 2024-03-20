const express = require('express');
const CandidateController = require("../controller/candidate-controller")
const router = express.Router();
// Sign up a user
router.post('/candidatesignup', CandidateController.Candidatesignup);

router.post('/candidatelogin', CandidateController.Candidatelogin);


module.exports = router;