const slugify = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactroy");
// @dec Get brands
// @route GET /api/v1/brands 
// @access Public
exports.getBrands = expressAsyncHandler(async (req, res) => {
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 10;
    // const skip = (page - 1) * limit;
    // const brands = await Brand.find({}).skip(skip).limit(limit);
    // res.status(200).json({ result: brands.length, page, data: brands });
    const documentsCount = await Brand.countDocuments()
    const apiFeatures = new ApiFeatures(Brand.find(), req.query).paginate(documentsCount).filter().search().limitFields().sort();
    // Execute query
    const { mongooseQuery, paginationDocs } = apiFeatures;
    const brands = await mongooseQuery;

    res.status(200).json({ result: brands.length, paginationDocs, data: brands });
});

// @dec Get specific brand by id
// @route GET /api/v1/brands/:id
// @access Public
exports.getBrand = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) {
        return next(new ApiError(`No brand found for this id ${id}`, 404));
    }
    res.status(200).json({ data: brand });
})


// @dec Create brand
// @route POST /api/v1/brands 
// @access Private
exports.createBrand = expressAsyncHandler(async (req, res) => {
    const { name } = req.body;
    const brand = await Brand.create({ name, slug: slugify(name) });
    res.status(201).json({ data: brand })
});


// @dec Update specific brand 
// @route PUT /api/v1/brands/:id 
// @access Private
exports.updateBrand = factory.updateOne(Brand);
// @dec Delete specific brand 
// @route POST /api/v1/brands/:id
// @access Private
exports.deleteBrand = factory.deleteOne(Brand);