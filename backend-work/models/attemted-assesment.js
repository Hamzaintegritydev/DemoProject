const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const attemptedAssessmentSchema = new Schema({
    assessmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assessment',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    password: {
        type: String,
        // required: true
    },
    phone: {
        type: String,
        // required: true
    },
    email: {
        type: String,
    // required: true,
    },
   test_scores: [
   {
     test_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Test',
     },
    score: {
       type: Number,
       default: 0,
     },
   },
],
});
const AttemptedAssessment = mongoose.model('AttemptedAssessment', attemptedAssessmentSchema);
module.exports = AttemptedAssessment;