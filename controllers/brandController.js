const Brand = require("../models/brandModel");
const factory = require("./handlersFactroy");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const { uploadSingelLImage } = require("../middlewares/uploadMiddleware");

// image upload
exports.uploadBrandImg = uploadSingelLImage('image');
//  image processing
exports.resizeImage = (req, res, next) => {
    const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
    sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 98 })
        .toFile(`uploads/brands/${filename}`);
    // DB save image 
    req.body.image = filename;
    next();
};

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