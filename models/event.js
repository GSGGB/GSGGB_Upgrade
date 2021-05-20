'use strict';

const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 1
    },
    imageId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 1
    },
    date: {
        type: String,
        required: true,
        minlength: 1
    }
})

// make a model using the schema
const Event = mongoose.model('Event', EventSchema)
module.exports = { Event }
