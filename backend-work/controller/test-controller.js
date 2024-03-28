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


exports.updateTest = async (req, res) => {
  try {
    const { testId } = req.params; // Assuming testId is passed in the URL params
    const { test_name, difficulty, category_name } = req.body;

    // Find the test by its ID
    let test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ msg: 'Test not found' });
    }

    // Update test properties
    if (test_name) test.test_name = test_name;
    if (difficulty) test.difficulty = difficulty;

    // If category_name is provided, find the category and update it
    if (category_name) {
      const category = await Category.findOne({ category_name });
      if (!category) {
        return res.status(404).json({ msg: 'Category not found' });
      }
      test.categories = [category._id];
    }

    // Save the updated test
    test = await test.save();

    res.json(test); // Send the updated test object in response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};