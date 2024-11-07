const express = require('express');
const { getProductValidator, createProductValidator, updateProductValidator, deleteProductValidator } = require('../utils/validators/productValidator');

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImg,
    resizeImage,
} = require('../controllers/productController');

const router = express.Router();

router.route('/').get(getProducts).post(uploadProductImg, resizeImage, createProductValidator, createProduct);
router.route('/:id').get(getProductValidator, getProduct).put(uploadProductImg, resizeImage, updateProductValidator, updateProduct).delete(deleteProductValidator, deleteProduct);
module.exports = router;