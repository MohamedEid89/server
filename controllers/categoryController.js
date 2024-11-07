const Category = require("../models/categoryModel");
const factory = require("./handlersFactroy");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const { uploadSingelLImage } = require("../middlewares/uploadMiddleware");



// image upload
exports.uploadCategoryImg = uploadSingelLImage('image');
//  image processing
exports.resizeImage = (req, res, next) => {
    const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
    sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 98 })
        .toFile(`uploads/categories/${filename}`);
    // DB save image 
    req.body.image = filename;
    next();
};

// @dec Get Categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = factory.getAll(Category);

// @dec Get specific category by id
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategory = factory.getOne(Category);

// @dec Create Category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = factory.createOne(Category);

// @dec Update specific category
// @route PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = factory.updateOne(Category);

// @dec Delete specific category
// @route POST /api/v1/categories/:id
// @access Private
exports.deleteCategory = factory.deleteOne(Category);
