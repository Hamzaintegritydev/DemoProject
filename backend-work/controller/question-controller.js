const Question = require('../models/question-model');
const Category = require('../models/category-model');
exports.createQuestion = async (req, res) => {
  const { category_name, ...questionData } = req.body;
  //  console.log( "this is remaining question data from backend" + questionData.question,questionData.questionType,questionData.difficulty);
  const category = await Category.findOne({ category_name });
  console.log(category);
  if (!category) {
    return res.status(404).json({ message: 'Cannot find category' });
  }
  const question = new Question({
    ...questionData,
    category_id: category._id
    // created_by: req.admin._id,
    // company_id: req.companyId,
  });
  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};