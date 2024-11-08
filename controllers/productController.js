
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const expressAsyncHandler = require("express-async-handler");

const { uploadMultiImages } = require("../middlewares/uploadMiddleware");
const Product = require("../models/productModel");
const factory = require("./handlersFactroy");



// Upload multiple images for a product
exports.uploadProductImages = uploadMultiImages([
    { name: "featuredImage", maxCount: 1 },
    { name: "images", maxCount: 5 }
]);

exports.resizeImages = expressAsyncHandler(async (req, res, next) => {
    // featuredImage processing
    if (req.files.featuredImage) {
        const productFeaturedImage = `product-${uuidv4()}-${Date.now()}-featured.jpeg`;
        await sharp(req.files.featuredImage[0].buffer)
            .resize(2000, 1333)
            .toFormat("jpeg")
            .jpeg({ quality: 98 })
            .toFile(`uploads/products/${productFeaturedImage}`);
        // DB save image 
        req.body.featuredImage = productFeaturedImage;
    }

    if (req.files.images) {
        req.body.images = [];

        await Promise.all(
            req.files.images.map(async (img, index) => {
                const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
                await sharp(img.buffer)
                    .resize(2000, 1333)
                    .toFormat("jpeg")
                    .jpeg({ quality: 98 })
                    .toFile(`uploads/products/${imageName}`);
                // DB save image 
                req.body.images.push(imageName);
            })
        );
        next();

    }

});



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