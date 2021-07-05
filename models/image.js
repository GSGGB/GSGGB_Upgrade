'use strict';

const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    imageId: {
        type: String,
        required: true,
        minlength: 1
    },
    imageURL: {
        type: String,
        required: true,
        minlength: 1
    }
});

// make a model using the schema
const Image = mongoose.model('Image', ImageSchema)
module.exports = { Image }
