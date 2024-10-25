const slugify = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const ApiError = require("../utils/apiError");

// @dec Get products
// @route GET /api/v1/products 
// @access Public
exports.getProducts = expressAsyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const products = await Product.find({}).skip(skip).limit(limit).populate({ path: 'category', select: 'name -_id' });
    res.status(200).json({ result: products.length, page, data: products });

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
exports.updateProduct = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const product = await Product.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    if (!product) {
        res.status(404).json({ msg: `No product found for this id ${id}` });
    }
    res.status(200).json({ data: product });
})

// @dec Delete specific product 
// @route POST /api/v1/products/:id
// @access Private
exports.deleteProduct = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        res.status(404).json({ msg: `No product found for this id ${id}` });
    }
    res.status(204).send();
})