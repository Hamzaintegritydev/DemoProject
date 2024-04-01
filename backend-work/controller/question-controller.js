const Question = require('../models/question-model');
const Category = require('../models/category-model');
const Test = require("../models/test-models");
const Answer = require('../models/answer-model');


exports.createQuestion = async (req, res) => {
    const { category_name, question, questionType, difficulty, options } = req.body;
    console.log(category_name, question, questionType, difficulty, options); // Step 1: Log the data

    try {
        const category = await Category.findOne({ category_name });
        if (!category) {
            return res.status(404).json({ message: 'Cannot find category' });
        }
        
        const newQuestion = new Question({
            question,
            questionType,
            difficulty,
            category_id: category._id,
            
        });

        const savedQuestion = await newQuestion.save();

        const correctAnswer = new Answer({
            question: savedQuestion._id, 
            options
            
            
        });
        const savedAnswer = await correctAnswer.save();

        res.status(201).json({ question: savedQuestion, answer: savedAnswer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// exports.createQuestion = async (req, res) => {
//   const { category_name, options, ...questionData } = req.body;
//   const category = await Category.findOne({ category_name });
//   if (!category) {
//     return res.status(404).json({ message: 'Cannot find category' });
//   }
//   const question = new Question({
//     ...questionData,
//     category_id: category._id,
//   });
//   try {
//     const newQuestion = await question.save();
//     // Find tests that already exist with the same category and difficulty
//     const testsWithSameCategoryDifficulty = await Test.find({
//       categories: category._id,
//       questions: {
//         $elemMatch: {
//           difficulty: question.difficulty,
//           _id: { $ne: newQuestion._id },
//         },
//       },
//     }).exec();
//     // If tests with the same category and difficulty are found, update the first one with the new question
//     if (testsWithSameCategoryDifficulty.length > 0) {
//       const updatedTest = await Test.findOneAndUpdate(
//         {
//           _id: testsWithSameCategoryDifficulty[0]._id,
//         },
//         {
//           $push: {
//             questions: newQuestion._id,
//           },
//         },
//         {
//           new: true,
//         }
//       ).exec();
//       res.status(201).json(updatedTest.questions);
//     } else {
//       res.status(201).json([newQuestion._id]);
//     }
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };






//const Test = require("../models/test-models")
// exports.createQuestion = async (req, res) => {
//   const { difficulty, category_name, ...questionData } = req.body;
//   //  console.log( "this is remaining question data from backend" + questionData.question,questionData.questionType,questionData.difficulty);
//   const category = await Category.findOne({ category_name });
//   console.log(category);
//   if (!category) {
//     return res.status(404).json({ message: 'Cannot find category' });
//   }
//   const question = new Question({
//     ...questionData,
//     difficulty,
//     category_id: category._id
//     // created_by: req.admin._id,
//     // company_id: req.companyId,
//   });
//   try {
//     const newQuestion = await question.save();

//   //   const foundTest = await Test.findTestWithCategoryAndDifficulty(category_name, difficulty);
//   // if (foundTest) {
//   //   console.log(foundTest);
//   //   foundTest.questions.push(question._id);
//   //   await foundTest.save();
//   // }
//   await Question.addQuestionToTest(newQuestion);


//     res.status(201).json(newQuestion);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };