const slugify = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const SubCategory = require("../models/subCategoryModel");
const ApiError = require("../utils/apiError");



// @dec Create subCategory
// @route POST /api/v1/subcategories 
// @access Private
exports.createSubCategory = expressAsyncHandler(async (req, res) => {
    const { name, category } = req.body;
    const subCategory = await SubCategory.create({ name, slug: slugify(name), category });
    res.status(201).json({ data: subCategory })
});


// @dec Get Categories
// @route GET /api/v1/categories 
// @access Public
exports.getSubCategories = expressAsyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const subCategories = await SubCategory.find({}).skip(skip).limit(limit);
    res.status(200).json({ result: subCategories.length, page, data: subCategories });

});

// @dec Get specific category by id
// @route GET /api/v1/categories/:id
// @access Public
exports.getSubCategory = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCtegory = await SubCategory.findById(id);
    if (!subCtegory) {
        return next(new ApiError(`No subcategory found for this id ${id}`, 404));
    }
    res.status(200).json({ data: subCtegory });
})


// @dec Update specific subcategory 
// @route POST /api/v1/subcategories/:id 
// @access Private
exports.updateSubCategory = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, category } = req.body;
    const subCategory = await SubCategory.findByIdAndUpdate({ _id: id }, { name, slug: slugify(name), category }, { new: true }); // return doc after update
    if (!subCategory) {
        res.status(404).json({ msg: `No subcategory found for this id ${id}` });
    }
    res.status(200).json({ data: subCategory });
})

// @dec Delete specific subcategory 
// @route POST /api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await SubCategory.findByIdAndDelete(id);
    if (!subCategory) {
        res.status(404).json({ msg: `No subcategory found for this id ${id}` });
    }
    res.status(204).send();
})