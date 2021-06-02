'use strict';

const mongoose = require('mongoose')

const SponsorSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 1
    },
    imageId: {
        type: String,
        required: true,
        minlength: 1
    },
    type: {
        type: String,
        required: true,
        minlength: 1
    },
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    link: {
        type: String,
        required: true,
        minlength: 1
    },
    width: {
        type: Number,
        required: true,
        minlength: 1
    },
    height: {
        type: Number,
        minlength: 0
    },
    marginLeft: {
        type: Number,
        minlength: 0
    },
    marginRight: {
        type: Number,
        minlength: 0
    },
    marginTop: {
        type: Number,
        minlength: 0
    },
    marginBottom: {
        type: Number,
        minlength: 0
    }
})

// make a model using the schema
const Sponsor = mongoose.model('Sponsor', SponsorSchema)
module.exports = { Sponsor }
