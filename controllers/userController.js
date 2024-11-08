const User = require("../models/userModel");
const factory = require("./handlersFactroy");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const { uploadSingelLImage } = require("../middlewares/uploadMiddleware");

// image upload
exports.uploadUserImg = uploadSingelLImage('profileImg');
//  image processing
exports.resizeImage = (req, res, next) => {
    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
    sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 98 })
        .toFile(`uploads/users/${filename}`);
    // DB save image 
    req.body.image = filename;
    next();
};

// @dec Get users
// @route GET /api/v1/users 
// @access Private
exports.getUsers = factory.getAll(User);

// @dec Get specific user by id
// @route GET /api/v1/users/:id
// @access Private
exports.getBrand = factory.getOne(User);

// @dec Create user
// @route POST /api/v1/users 
// @access Private
exports.createUser = factory.createOne(User);

// @dec Update specific user 
// @route PUT /api/v1/users/:id 
// @access Private
exports.updateUser = factory.updateOne(User);

// @dec Delete specific user 
// @route POST /api/v1/users/:id
// @access Private
exports.deleteUser = factory.deleteOne(User);