const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        trim: true,  // spaces delete,
        required: [true, 'Product name is required'],
        minlength: [3, 'Product name should be at least 3 characters long'],
        maxlength: [255, 'Product name should not be more than 255 characters long'],
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        minlength: [10, 'Product description should be at least 10 characters long'],
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
        min: [0, 'Product quantity should be greater than or equal to 0'],
    },
    sold: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,  // spaces delete,
        min: [0, 'Product price should be greater than or equal to 0'],
        max: [1000000, 'Tp long product price should not be more than 1000000'],
    },
    priceAfterDiscount: {
        type: Number,
    },

    colors: [String],
    images: [String],

    featuredImage: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Product must belong to a category'],
    },
    subcategories: [{
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
    },],
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand',
    },
    ratingsAverage: {
        type: Number,
        default: 0,
        min: [1, 'Rating should be between 1 and 5'],
        max: [5, 'Rating should be between 1 and 5'],
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },


}, { timestamps: true });

// Mongoose Query Middleware  // category populated
productSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'category',
        select: 'name'
    });
    next();
});


const setImagUrl = (doc) => {
    // set baseURL + image
    if (doc.featuredImage) {
        const imageUrl = `${process.env.BASE_URL}/products/${doc.featuredImage}`;
        doc.featuredImage = imageUrl;
    }
}
productSchema.post('init', (doc) => {
    setImagUrl(doc);
})
productSchema.post('save', (doc) => {
    setImagUrl(doc);
})


module.exports = mongoose.model('Product', productSchema);