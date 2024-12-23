const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const slugify = require('slugify');

exports.getBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand id format'),
    validatorMiddleware
];

exports.createBrandValidator = [
    check('name').notEmpty().withMessage('Brand name required').isLength({ min: 3 }).withMessage('Too short brand name').isLength({ max: 32 }).withMessage('Too long brand name'),
    check('name').custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware
];

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand id format'),
    check('name').custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware
];

exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand id format'),
    validatorMiddleware
];