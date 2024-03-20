const express = require('express');
const categoryController = require('../controller/category-controller');
const router = express.Router();
// Create a category
router.post('/create', categoryController.createCategory);
module.exports = router;