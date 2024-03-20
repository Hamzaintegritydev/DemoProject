const mongoose = require('mongoose');
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
module.exports = mongoose.model('Test', TestSchema);