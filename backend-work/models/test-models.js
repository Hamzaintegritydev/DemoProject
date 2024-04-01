const mongoose = require('mongoose');
const Category = require("./category-model")
const TestSchema = new mongoose.Schema({
  test_name: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  is_available: {
    type: Boolean,
    default: true,
  },
 // company_id: {
 //   type: mongoose.Schema.Types.ObjectId,
 //   ref: 'Company',
//    required: true,
//  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  questions: [{}],
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// TestSchema.statics.findTestWithCategoryAndDifficulty = async (category_name, difficulty) => {
//   const category = await Category.findOne({ category_name });
// if (category) {
//     return Test.findOne({ categories: category._id, 'questions.difficulty': difficulty });
//   }
//   return null;
// };

module.exports = mongoose.model('Test', TestSchema);