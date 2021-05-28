'use strict';

const mongoose = require('mongoose')

const ExecutiveSchema = new mongoose.Schema({
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
    firstName: {
        type: String,
        required: true,
        minlength: 1
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1
    },
    team: {
        type: String,
        required: true,
        minlength: 1
    },
    position: {
        type: String,
        required: true,
        minlength: 1
    },
    biography: {
        type: String,
        required: true,
        minlength: 1
    },
    linkedin: {
        type: String,
        minlength: 1
    },
    email: {
        type: String,
        minlength: 1
    }
})

// make a model using the schema
const Executive = mongoose.model('Executive', ExecutiveSchema)
module.exports = { Executive }
