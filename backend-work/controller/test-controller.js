const Test = require('../models/test-models');
const Category = require('../models/category-model');
const Question = require('../models/question-model');
const Assessment = require("../models/assessment.model");
exports.createTest = async (req, res) => {
  try {
    const { test_name, difficulty,category_name,created_by } = req.body;
    const category = await Category.findOne({ category_name: category_name });
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    const questions = await Question.find({ category_id: category._id, difficulty });
    if (!questions) {
        return res.status(404).json({ msg: 'Questions not found' });
      }
    const newTest = new Test({
        test_name,
      //  is_active: true,
      //  is_available: true,
      //  company_id: req.user.company_id,
        categories: [category._id],
        questions,
      });
    await newTest.save();
    const assessment = await Assessment.findOne({ created_by: created_by });
    assessment.tests.push(newTest._id);
    await assessment.save();
    res.json(newTest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};