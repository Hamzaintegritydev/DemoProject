const mongoose = require('mongoose');
// const Category = require('./category');
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
module.exports = mongoose.model('Question', QuestionSchema);