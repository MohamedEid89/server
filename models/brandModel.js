const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Brand required'],
            unique: [true, 'Brand exists'],
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
        const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
        doc.image = imageUrl;
    }
}
brandSchema.post('init', (doc) => {
    setImagUrl(doc);
})
brandSchema.post('save', (doc) => {
    setImagUrl(doc);
})


module.exports = mongoose.model('Brand', brandSchema);

