const Answer = require('../models/answer-model');
const Question = require('../models/question-model');
exports.createAnswer = async (req, res) => {
  const { question_id, ...answerData } = req.body;
  const question = await Question.findById(question_id);
  if (!question) {
    return res.status(404).json({ message: 'Cannot find question' });
  }
  const answer = new Answer({
    ...answerData,
    question: question._id,
  //  user: req.user._id,
  });
  try {
    const newAnswer = await answer.save();
    res.status(201).json(newAnswer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.verifyAnswer = async (req, res) => {
  const { answer_id, selected_option } = req.body;
  const answer = await Answer.findById(answer_id);
  if (!answer) {
    return res.status(404).json({ message: 'Cannot find answer' });
  }
  if (answer.question.questionType === 'multiple_choice') {
    const correct_option = answer.options.find(
      (option) => option.is_correct === true
    );
    if (selected_option === correct_option.option) {
      answer.is_correct = true;
    } else {
      answer.is_correct = false;
    }
  } else if (answer.question.questionType === 'true_false') {
    if (answer.question.answer === true && selected_option === 'true') {
      answer.is_correct = true;
    } else if (answer.question.answer === false && selected_option === 'false') {
      answer.is_correct = true;
    } else {
      answer.is_correct = false;
    }
  }
  try {
    const updatedAnswer = await answer.save();
    res.status(200).json(updatedAnswer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};