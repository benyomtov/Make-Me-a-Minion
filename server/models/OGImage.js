const { Schema, model } = require('mongoose');

// og image schema

const ogImageSchema = new Schema({
    filename: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return /(.+)\.(png|PNG)$/i.test(v);
            },
            message: `${this.filename} is not a PNG file.}`
        },
    },
    image: {
        type: Buffer,
        required: true,
    },
});

// og image model

const OGImage = model('OGImage', ogImageSchema);

// export

module.exports = { ogImageSchema, OGImage };