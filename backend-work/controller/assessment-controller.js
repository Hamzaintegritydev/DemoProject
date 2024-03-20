//const Category = require('../models/category-model');
const Assessment = require('../models/assessment.model');
//const Test = require('../models/test-models');
exports.createAssessment = async (req, res) => {
    const assesmentExists = await Assessment.findOne({ assesment_name: req.body.assesment_name });
    if (assesmentExists) {
      return res.status(400).json({ message: 'Assesment already exists' });
    }


  try {
    const { assesment_name} = req.body;
    const newAssessment = new Assessment({
        assesment_name,
      //  is_active: true,
      //  is_available: true,
       // company_id: req.user.company_id,
       created_by:req.body.created_by,
       tests: [],
      });
      const newAssessmentSaved =  await newAssessment.save();

      const assessmentLink = `http://localhost:5000/api/v3/find/${newAssessmentSaved._id}`;

    res.json({ assessment: newAssessmentSaved, link: assessmentLink });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};



exports.getAllAssesment = async (req, res) => {
  try {
    const categories = await Assessment.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};