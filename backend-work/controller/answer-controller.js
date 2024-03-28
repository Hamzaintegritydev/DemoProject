const Answer = require('../models/answer-model');
const Question = require('../models/question-model');
const Candidate = require('../models/candidate-model')
const AttemptedAssessment = require('../models/attemted-assesment');
const Test = require("../models/test-models")
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
  const { answer_id, selected_option, assessmentId, testId, candidateId } = req.body;
  const answer = await Answer.findById(answer_id).populate('question').exec();
  if (!answer) {
    return res.status(404).json({ message: 'Cannot find answer' });
  }
  let correct = false;
  if (answer.question.questionType === 'multiple_choice') {
    correct = answer.options.find((option) => option.is_correct === true).option === selected_option;
  } else if (answer.question.questionType === 'true_false') {
    correct = answer.options.find((option) => option.is_correct === true).option === selected_option;
  }
  if (correct) {
    answer.is_correct = true;
    // Find the attempted assessment with the given assessmentId
    const attemptedAssessment = await AttemptedAssessment.findOne({ assessmentId: assessmentId, candidateId: candidateId });
    if (!attemptedAssessment) {
      return res.status(404).json({ message: 'Cannot find attempted assessment' });
    }
    // Find the test score object with the given testId in the test_scores array
    const testScore = attemptedAssessment.test_scores.find((score) => score.test_id.toString() === testId);
    if (!testScore) {
      return res.status(404).json({ message: 'Cannot find test score' });
    }
    console.log(testScore);
    // Update the score for the correct answer
    testScore.score += 2;
    await attemptedAssessment.save();
  } else {
    answer.is_correct = false;
    // Find the attempted assessment with the given assessmentId
    const attemptedAssessment = await AttemptedAssessment.findOne({ assessmentId: assessmentId, candidateId: candidateId });
    if (!attemptedAssessment) {
      return res.status(404).json({ message: 'Cannot find attempted assessment' });
    }
    // Find the test score object with the given testId in the test_scores array
    const testScore = attemptedAssessment.test_scores.find((score) => score.test_id.toString() === testId);
    if (!testScore) {
      return res.status(404).json({ message: 'Cannot find test score' });
    }
    // Update the score for the incorrect answer
    testScore.score -= 1;
    await attemptedAssessment.save();
  }
  await answer.save();
  res.status(200).json({ message: correct ? 'Correct answer' : 'Wrong answer', answer: answer });
};