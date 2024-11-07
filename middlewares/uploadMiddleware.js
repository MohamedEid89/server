
const multer = require("multer");
const ApiError = require("../utils/apiError");


// upload single image
exports.uploadSingelLImage = (fieldName) => {
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

    // Export the middleware function for handling single image uploads
    return uploads.single(fieldName);

}




// exports.uploadSingelImage = () => {
//     // Configure disk storage
//     // const diskStorage = multer.diskStorage({
//     //     destination: (req, file, cb) => {
//     //         cb(null, 'uploads/categories');
//     //     },
//     //     filename: (req, file, cb) => {
//     //         const ext = file.mimetype.split('/')[1]; // Extract file extension
//     //         const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
//     //         cb(null, filename);
//     //     },

//     // });

// }