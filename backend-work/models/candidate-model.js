const mongoose = require('mongoose');
const CandidateSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  user_type: {
    type: String,
    enum: ['admin', 'user'],
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
//   companies: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Company',
//     },
//   ],
});
const Candidate = new mongoose.model("candidtes", CandidateSchema);
module.exports = Candidate;