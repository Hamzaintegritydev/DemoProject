const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    question: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Question',
       required: true,
    },

    candidateID: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true
    },

  //  user: {
  //          type: mongoose.Schema.Types.ObjectId,
   //         ref: 'User',
   //         required: true,
   //       },

          options: [
                {
                  option: {
                    type: String,
                    required: true,
                  },
                  is_correct: {
                    type: Boolean,
                    default: false,
                  },
                },
              ],
            
    // selected_option: {
    //                 type: String,
    //                  enum: ['optionA', 'optionB', 'optionC', 'optionD', 'true', 'false'],
    //               //  required: true,
    //               },
                  is_correct: {
                    type: Boolean,
                    default: false,
                  },
                });

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;