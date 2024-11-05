const slugify = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactroy");

// @dec Get products
// @route GET /api/v1/products 
// @access Public
exports.getProducts = expressAsyncHandler(async (req, res, next) => {

    const documentsCount = await Product.countDocuments()
    const apiFeatures = new ApiFeatures(Product.find(), req.query).paginate(documentsCount).filter().search().limitFields().sort();
    // Execute query
    const { mongooseQuery, paginationDocs } = apiFeatures;
    const products = await mongooseQuery;

    res.status(200).json({ result: products.length, paginationDocs, data: products });
});

// @dec Get specific product by id
// @route GET /api/v1/products/:id
// @access Public
exports.getProduct = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate({ path: 'category', select: 'name -_id' });
    if (!product) {
        return next(new ApiError(`No product found for this id ${id}`, 404));
    }
    res.status(200).json({ data: product });
})


// @dec Create product
// @route POST /api/v1/products 
// @access Private
exports.createProduct = expressAsyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title);
    const product = await Product.create(req.body);
    res.status(201).json({ data: product })
});

// @dec Update specific product 
// @route POST /api/v1/products/:id 
// @access Private
exports.updateProduct = factory.updateOne(Product);

// @dec Delete specific product 
// @route POST /api/v1/products/:id
// @access Private
exports.deleteProduct = factory.deleteOne(Product);