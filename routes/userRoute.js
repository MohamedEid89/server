const express = require('express');
// const { getUserValidator, createUserValidator, updateUserValidator, deleteUserValidator } = require('../utils/validators/UserValidator');

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    uploadUserImg,
    resizeImage,
} = require('../controllers/UserController');

const router = express.Router();

router.route('/').get(getUsers).post(uploadUserImg, resizeImage, createUser);
router.route('/:id').get(getUser).put(uploadUserImg, resizeImage, updateUser).delete(deleteUser);
module.exports = router;