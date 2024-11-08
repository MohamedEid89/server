const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: (email) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email),
            message: 'Please enter a valid email address',
        },
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        validate: {
            validator: (phone) => /^\+?\d{1,3}?[- .]?\(?\d{3}\)?[- .]?\d{3}[- .]?\d{4}$/.test(phone),
            message: 'Please enter a valid phone number',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password should be at least 8 characters long'],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    profileImg: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);