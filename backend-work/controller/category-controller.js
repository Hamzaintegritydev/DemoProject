const Category = require('../models/category-model');
exports.createCategory = async (req, res) => {
  const categoryExists = await Category.findOne({ category_name: req.body.categoryName });
  console.log(req.body.categoryName);
  if (categoryExists) {
    return res.status(400).json({ message: 'Category already exists' });
  }
  const category = new Category(req.body);
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};