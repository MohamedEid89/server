const express = require('express');

const { createFilterObject, setCategoryToBody, createSubCategory, getSubCategories, getSubCategory, updateSubCategory, deleteSubCategory } = require('../controllers/subCategoryController');
const { createSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator } = require('../utils/validators/subCategoryValidator');

// MergeParams middleware to use the category id in subcategory routes
const router = express.Router({ mergeParams: true });

router.route('/').post(setCategoryToBody, createSubCategoryValidator, createSubCategory).get(createFilterObject, getSubCategories);
router.route('/:id').get(getSubCategoryValidator, getSubCategory).put(updateSubCategoryValidator, updateSubCategory).delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;