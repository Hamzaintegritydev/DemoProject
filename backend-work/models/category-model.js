const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
module.exports = mongoose.model('Category', CategorySchema);