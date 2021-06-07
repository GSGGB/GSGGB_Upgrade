'use strict';

const mongoose = require('mongoose')

const ResearchSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 1
    },
    url: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})

// make a model using the schema
const Research = mongoose.model('Research', ResearchSchema)
module.exports = { Research }
