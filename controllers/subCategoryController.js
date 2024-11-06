const SubCategory = require("../models/subCategoryModel");
const factory = require("./handlersFactroy");


// @dec Get subcategory via categoryIDs
exports.setCategoryToBody = (req, res, next) => {
    if (!req.body.category) {
        req.body.category = req.params.categoryId;
    }
    next();
};

// @dec create a filter object based on category ID
exports.createFilterObject = (req, res, next) => {
    let filterObject = {};
    if (req.params.categoryId) {
        filterObject = { category: req.params.categoryId };
        req.filterObj = filterObject;
    }
    next();
}


// @dec Get subcategories
// @route GET /api/v1/subcategories 
// @access Public
exports.getSubCategories = factory.getAll(SubCategory);

// @dec Create subcategories
// @route POST /api/v1/subcategories 
// @access Private
exports.createSubCategory = factory.createOne(SubCategory);

// @dec Get specific subcategory by id
// @route GET /api/v1/subcategories/:id
// @access Public
exports.getSubCategory = factory.getOne(SubCategory);

// @dec Update specific subcategory 
// @route POST /api/v1/subcategories/:id 
// @access Private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @dec Delete specific subcategory 
// @route POST /api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);