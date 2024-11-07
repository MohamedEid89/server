const express = require('express');

const { createFilterObject, setCategoryToBody, createSubCategory, getSubCategories, getSubCategory, updateSubCategory, deleteSubCategory, uploadSubCategoryImg, resizeImage } = require('../controllers/subCategoryController');
const { createSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator } = require('../utils/validators/subCategoryValidator');

// MergeParams middleware to use the category id in subcategory routes
const router = express.Router({ mergeParams: true });

router.route('/').post(setCategoryToBody, uploadSubCategoryImg, resizeImage, createSubCategoryValidator, createSubCategory).get(createFilterObject, getSubCategories);
router.route('/:id').get(getSubCategoryValidator, getSubCategory).put(uploadSubCategoryImg, resizeImage, updateSubCategoryValidator, updateSubCategory).delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;