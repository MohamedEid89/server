const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true, // spaces delete
            unique: [true, 'Subcategory exists'],
            minlenght: [2, 'To short Subcategory name'],
            maxlenght: [32, 'To long Subcategory name'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        // relations
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: [true, 'Subcategory must be belong to parent category'],
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('SubCategory', subCategorySchema);




