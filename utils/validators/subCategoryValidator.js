const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validatorMiddleware
];

exports.createSubCategoryValidator = [
    check("name")
        .notEmpty()
        .withMessage("SubCategory required")
        .isLength({ min: 3 })
        .withMessage("Too short Subcategory name")
        .isLength({ max: 32 })
        .withMessage("Too long Subcategory name"),
    check("category").isMongoId().withMessage("Invalid Category id format").notEmpty()
        .withMessage("SubCategory must belong to a valid Category"),
    validatorMiddleware,
];

exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validatorMiddleware
];

exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validatorMiddleware
];
