const express = require('express');
const { getProductValidator, createProductValidator, updateProductValidator, deleteProductValidator } = require('../utils/validators/productValidator');

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImages,
    resizeImages,
} = require('../controllers/productController');

const router = express.Router();

router.route('/').get(getProducts).post(uploadProductImages, resizeImages, createProductValidator, createProduct);
router.route('/:id').get(getProductValidator, getProduct).put(uploadProductImages, resizeImages, updateProductValidator, updateProduct).delete(deleteProductValidator, deleteProduct);
module.exports = router;