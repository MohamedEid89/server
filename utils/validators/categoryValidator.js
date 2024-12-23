const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const slugify = require('slugify');

exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware
];

exports.createCategoryValidator = [
    check('name').notEmpty().withMessage('Category name required').isLength({ min: 3 }).withMessage('Too short category name').isLength({ max: 32 }).withMessage('Too long category name'),
    check('name').custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware
];

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware
];

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware
];