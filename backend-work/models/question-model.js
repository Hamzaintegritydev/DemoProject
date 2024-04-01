const mongoose = require('mongoose');
//const Test = require("./test-models")
 const Category = require('./category-model');
// const User = require('../models/user');
// const Company = require('../models/Company');
const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    enum: ['multiple_choice', 'true_false'],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  // categories: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Category',
  //   },
  // ],
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    // required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
 // company_id: {
 //   type: mongoose.Schema.Types.ObjectId,
 //   ref: 'Company',
 // },
  is_active: {
    type: Boolean,
    default: true,
  },
});


// QuestionSchema.statics.addQuestionToTest = async function (question) {
//   const Test = mongoose.model("Test");
//   const categories = await Category.aggregate([
//     { $match: { _id: question.category_id } },
//     {
//       $lookup: {
//         from: "tests",
//         localField: "_id",
//         foreignField: "categories",
//         as: "tests",
//       },
//     },
//   ]);
//   if (categories && categories.length > 0) {
//     categories[0].tests.forEach(async (test) => {
//       const testQuestions = await Test.findById(test._id, "questions");
//       if (
//         testQuestions &&
//         testQuestions.questions.filter(
//           (q) => q.difficulty === question.difficulty && q.category_id.toString() === question.category_id.toString()
//         ).length < 1
//       ) {
//         testQuestions.questions.push(question._id);
//         await Test.findByIdAndUpdate(test._id, testQuestions);
//       }
//     });
//   }
// };



// QuestionSchema.statics.addQuestionToTest = async function (question) {
//   const Test = mongoose.model("Test");
//   const categories = await Category.aggregate([
//     { $match: { _id: question.category_id } },
//     {
//       $lookup: {
//         from: "tests",
//         localField: "_id",
//         foreignField: "categories",
//         as: "tests",
//       },
//     },
//   ]);
  
//   console.log("Categories:", categories);

//   if (categories && categories.length > 0) {
//     for (const category of categories) {
//       for (const test of category.tests) {
//         console.log("Test:", test);

//         const testQuestions = await Test.findById(test._id, "questions");
//         console.log("Test Questions:", testQuestions);

//         if (
//           testQuestions &&
//           testQuestions.questions.filter(
//               (q) => q.difficulty === question.difficulty && q.category_id.toString() === question.category_id.toString()
//           ).length === 0 // Check if the filtered questions array is empty
//       ) {
//           // Update the test document with the new question
//           const updatedTest = await Test.findByIdAndUpdate(
//               test._id,
//               { $push: { questions: question._id } },
//               { new: true } // Ensure we get the updated document
//           );
//           console.log("Updated Test:", updatedTest);
//       }
//       }
//     }
//   }
// };








module.exports = mongoose.model('Question', QuestionSchema);