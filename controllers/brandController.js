const Brand = require("../models/brandModel");
const factory = require("./handlersFactroy");

// @dec Get brands
// @route GET /api/v1/brands 
// @access Public
exports.getBrands = factory.getAll(Brand);

// @dec Get specific brand by id
// @route GET /api/v1/brands/:id
// @access Public
exports.getBrand = factory.getOne(Brand);

// @dec Create brand
// @route POST /api/v1/brands 
// @access Private
exports.createBrand = factory.createOne(Brand);


// @dec Update specific brand 
// @route PUT /api/v1/brands/:id 
// @access Private
exports.updateBrand = factory.updateOne(Brand);

// @dec Delete specific brand 
// @route POST /api/v1/brands/:id
// @access Private
exports.deleteBrand = factory.deleteOne(Brand);