const slugify = require("slugify");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const ApiError = require("../utils/apiError");
const { $where } = require("../models/categoryModel");

// @dec Get products
// @route GET /api/v1/products 
// @access Public
exports.getProducts = expressAsyncHandler(async (req, res, next) => {

    // Filtration products
    const queryStringObj = { ...req.query };
    const excludesFields = ['page', 'sort', 'limit', 'fields'];
    excludesFields.forEach((field) => delete queryStringObj[field]);

    // console.log(queryStringObj);

    //  Pagination products
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    let queryStr = JSON.stringify(queryStringObj); // replace to string 

    // replace to string can add '$'
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // console.log(JSON.parse(queryStr)); // replace to object

    // Build query
    let mongooseQuery = Product.find(JSON.parse(queryStr)).skip(skip).limit(limit).populate({ path: 'category', select: 'name -_id' });


    // sorting products

    if (req.query.sort) {
        // price, - sold => [ price, -sold ] => [ price -sold ]
        const sortBy = req.query.sort.split(',').join(' ');
        // console.log(sortBy);
        mongooseQuery = mongooseQuery.sort(sortBy);
    } else {
        mongooseQuery = mongooseQuery.sort('-createdAt');
    }
    // Fields Limitation 
    if (req.query.fields) {
        // products?fields=price,sold,ratingsAverage,colors
        const fields = req.query.fields.split(',').join(' ');
        mongooseQuery = mongooseQuery.select(fields);

    } else {
        mongooseQuery = mongooseQuery.select('-__v');
    }

    // Search products
    // if (req.query.keyword) {
    //     const query = {};
    //     query.$or = [
    //         { title: { $regex: req.query.keyword, $options: 'i' } },
    //         // { description: { $regex: req.query.keyword, $options: 'i' } },
    //         // { brand: { $regex: req.query.keyword, $options: 'i' } },
    //         // { color: { $regex: req.query.keyword, $options: 'i' } },
    //     ];
    //     mongooseQuery = mongooseQuery.find(query);

    // }



    // Execute query
    const products = await mongooseQuery;

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