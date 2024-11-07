const Product = require("../models/productModel");
const factory = require("./handlersFactroy");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const { uploadSingelLImage } = require("../middlewares/uploadMiddleware");



exports.uploadProductImg = uploadSingelLImage('featuredImage');
//  image processing
// exports.resizeImage = (req, res, next) => {
//     const filename = `product-${uuidv4()}-${Date.now()}.jpeg`;
//     sharp(req.file.buffer)
//         .resize(600, 600)
//         .toFormat("jpeg")
//         .jpeg({ quality: 98 })
//         .toFile(`uploads/products/${filename}`);
//     // DB save image 
//     req.body.featuredImage = filename;
//     next();
// };


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