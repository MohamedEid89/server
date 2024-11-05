const slugify = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const SubCategory = require("../models/subCategoryModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
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
// @dec Create subcategories
// @route POST /api/v1/subcategories 
// @access Private
exports.createSubCategory = expressAsyncHandler(async (req, res) => {
    const { name, category } = req.body;
    const subCategory = await SubCategory.create({ name, slug: slugify(name), category });
    res.status(201).json({ data: subCategory })
});



// @dec Get subcategories
// @route GET /api/v1/subcategories 
// @access Public
exports.getSubCategories = expressAsyncHandler(async (req, res) => {
    const documentsCount = await SubCategory.countDocuments();
    const apiFeatures = new ApiFeatures(SubCategory.find(), req.query).paginate(documentsCount).filter().search().limitFields().sort();
    // Execute query
    const { mongooseQuery, paginationDocs } = apiFeatures;
    const subcategories = await mongooseQuery;

    res.status(200).json({ result: subcategories.length, paginationDocs, data: subcategories });

});

// @dec Get specific subcategory by id
// @route GET /api/v1/subcategories/:id
// @access Public
exports.getSubCategory = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCtegory = await SubCategory.findById(id).populate({ path: 'category', select: 'name -_id' });
    if (!subCtegory) {
        return next(new ApiError(`No subcategory found for this id ${id}`, 404));
    }
    res.status(200).json({ data: subCtegory });
})


// @dec Update specific subcategory 
// @route POST /api/v1/subcategories/:id 
// @access Private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @dec Delete specific subcategory 
// @route POST /api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);