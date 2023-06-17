const { Schema, model } = require('mongoose');

const finalImageSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    caption: {
        type: String,
        required: true,
        trim: true,
    },
    creator: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: Buffer,
        required: true,
    },
});

const FinalImage = model('FinalImage', finalImageSchema);

module.exports = FinalImage;