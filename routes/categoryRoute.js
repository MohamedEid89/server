const express = require('express');
const { getCategoryValidator, createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } = require('../utils/validators/categoryValidator');

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');

// Nested router for subcategories 
const subcategoriesRoute = require('./subCategoryRoute');

const router = express.Router();

// Nested router for subcategories
router.use('/:categoryId/subcategories', subcategoriesRoute);
router.route('/').get(getCategories).post(createCategoryValidator, createCategory);
router.route('/:id').get(getCategoryValidator, getCategory).put(updateCategoryValidator, updateCategory).delete(deleteCategoryValidator, deleteCategory);
module.exports = router;