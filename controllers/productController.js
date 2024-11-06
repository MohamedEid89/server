const Product = require("../models/productModel");
const factory = require("./handlersFactroy");

// @dec Get products
// @route GET /api/v1/products 
// @access Public
exports.getProducts = factory.getAll(Product, 'Product');

// @dec Get specific product by id
// @route GET /api/v1/products/:id
// @access Public
exports.getProduct = factory.getOne(Product);

// @dec Create product
// @route POST /api/v1/products 
// @access Private
exports.createProduct = factory.createOne(Product);


// @dec Update specific product 
// @route POST /api/v1/products/:id 
// @access Private
exports.updateProduct = factory.updateOne(Product);

// @dec Delete specific product 
// @route POST /api/v1/products/:id
// @access Private
exports.deleteProduct = factory.deleteOne(Product);