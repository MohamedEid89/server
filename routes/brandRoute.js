const express = require('express');
const { getBrandValidator, createBrandValidator, updateBrandValidator, deleteBrandValidator } = require('../utils/validators/brandValidator');

const {
    getBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    uploadBrandImg,
    resizeImage,
} = require('../controllers/brandController');

const router = express.Router();

router.route('/').get(getBrands).post(uploadBrandImg, resizeImage, createBrandValidator, createBrand);
router.route('/:id').get(getBrandValidator, getBrand).put(uploadBrandImg, resizeImage, updateBrandValidator, updateBrand).delete(deleteBrandValidator, deleteBrand);
module.exports = router;