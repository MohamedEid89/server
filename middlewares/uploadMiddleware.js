
const multer = require("multer");
const ApiError = require("../utils/apiError");

const multerOptions = () => {
    // Monery storage engine
    const diskStorage = multer.memoryStorage();
    // Filter only images
    const diskFilter = function (req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else cb(new ApiError("Only images allowed", 400), false);
    };
    // Set up multer with storage configuration
    const uploads = multer({ storage: diskStorage, fileFilter: diskFilter });
    return uploads;
}


// upload single image
exports.uploadSingelLImage = (fieldName) => multerOptions().single(fieldName);
// Upload multiple images
exports.uploadMultiImages = (arrayOfFields) => multerOptions().fields(arrayOfFields);
