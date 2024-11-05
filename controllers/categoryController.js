const slugify = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactroy");
// @dec Get Categories
// @route GET /api/v1/categories 
// @access Public
exports.getCategories = expressAsyncHandler(async (req, res) => {
    const documentsCount = await Category.countDocuments();
    const apiFeatures = new ApiFeatures(Category.find(), req.query).paginate(documentsCount).filter().search().limitFields().sort();
    // Execute query
    const { mongooseQuery, paginationDocs } = apiFeatures;
    const categories = await mongooseQuery;

    res.status(200).json({ result: categories.length, paginationDocs, data: categories });

});

// @dec Get specific category by id
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategory = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
        return next(new ApiError(`No category found for this id ${id}`, 404));
    }
    res.status(200).json({ data: category });
})


// @dec Create Category
// @route POST /api/v1/categories 
// @access Private
exports.createCategory = expressAsyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = await Category.create({ name, slug: slugify(name) });
    res.status(201).json({ data: category })
});

// @dec Update specific category 
// @route PUT /api/v1/categories/:id 
// @access Private
exports.updateCategory = factory.updateOne(Category);

// @dec Delete specific category 
// @route POST /api/v1/categories/:id
// @access Private
exports.deleteCategory = factory.deleteOne(Category);