const AttemptedAssessment = require("../models/attemted-assesment");
const Assessment = require('../models/assessment.model');
const Users = require('../models/user-model');
const Test = require("../models/test-models")
const createAttemptedAssessment = async (req, res) => {
    try {
      const { userId, assessmentId,tests ,candidateId} = req.body;
      const assesment = await Assessment.findOne({_id:assessmentId});
      if (!assesment) {
        return res.status(404).json({ message: 'Assessment not found for this id' });
      }
      console.log(assesment);
      const user = await Users.findOne({_id:userId});
      if (!user) {
        return res.status(404).json({ message: 'User not found with this id' });
      }
      console.log(user);
      const candidate = await Users.findOne({_id:candidateId});
      if (!candidate) {
        return res.status(404).json({ message: 'candidate not found with this id' });
      }
      console.log(candidate);
    let foundTest;
     for(let i=0; i<tests.length;i++){
      foundTest = await Test.findOne({_id:tests[i].test_id});
      if(!foundTest){
        return res.status(404).json({ message: 'Test not found with this id' });
      }
     }
     const newAttemptedAssessment = new AttemptedAssessment({
      assessmentId,
      userId,
      candidateId,
      // is_active: true,
      // is_available: true,
      // company_id: req.user.company_id,
      // created_by:req.body.created_by,
      test_scores: tests
    });
    const newAttemptedAssessmentSaved =  await newAttemptedAssessment.save();
    res.json(newAttemptedAssessmentSaved);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
// res.status(201).json({message: 'Assesment with creator found successfully'});
//   console.log(assessment);
//       assessment.test_scores[testIndex] = { assessmentId, assessmentScore };
//       await assessment.save();
//       res.json({ message: 'Score updated successfully' });
    // } catch (err) {
    //   console.error(err.message);
    //   res.status(500).send('Server Error');
    // }
  };
 const getAssesmentById = async (req, res) => {
    let assesment;
    try {
      assesment = await Assessment.findById(req.params.id);
      if (assesment == null) {
        return res.status(404).json({ message: 'Cannot find Assesment' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json({message: 'Assesment with Link found successfully'});
  };
  module.exports = { createAttemptedAssessment,getAssesmentById };