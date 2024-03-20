const mongoose = require('mongoose');
const AssessmentSchema = new mongoose.Schema({
  assesment_name: {
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
//    type: mongoose.Schema.Types.ObjectId,
//    ref: 'Company',
 //   required: true,
//  },
  tests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
    },
  ],
 // test_scores: [
 //   {
 //     test_id: {
 //       type: mongoose.Schema.Types.ObjectId,
 //       ref: 'Test',
 //     },
 //    score: {
 //       type: Number,
 //       default: 0,
 //     },
///    },
// ],
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
module.exports = mongoose.model('Assessment', AssessmentSchema);