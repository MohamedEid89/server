const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            // unique: true,
            required: [true, 'Category required'],
            unique: [true, 'Category exists'],
            minlength: [3, 'Too short category name'],
            maxlength: [32, 'Too long category name'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        image: String,
    },
    { timestamps: true }
);

const setImagUrl = (doc) => {
    // set baseURL + image
    if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
        doc.image = imageUrl;
    }
}
categorySchema.post('init', (doc) => {
    setImagUrl(doc);
})
categorySchema.post('save', (doc) => {
    setImagUrl(doc);
})

module.exports = mongoose.model('Category', categorySchema);


