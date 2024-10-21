const slugify = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const ApiError = require("../utils/apiError");

// @dec Get Categories
// @route GET /api/v1/categories 
// @access Public
exports.getCategories = expressAsyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const categories = await Category.find({}).skip(skip).limit(limit);
    res.status(200).json({ result: categories.length, page, data: categories });

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
// @route POST /api/v1/categories/:id 
// @access Private
exports.updateCategory = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate({ _id: id }, { name, slug: slugify(name) }, { new: true });
    if (!category) {
        res.status(404).json({ msg: `No category found for this id ${id}` });
    }
    res.status(200).json({ data: category });
})

// @dec Delete specific category 
// @route POST /api/v1/categories/:id
// @access Private
exports.deleteCategory = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        res.status(404).json({ msg: `No category found for this id ${id}` });
    }
    res.status(204).send();
})