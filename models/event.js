'use strict';

const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 1
    },
    imageURL: {
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

// make a model using the User schema
const Event = mongoose.model('Event', EventSchema)
module.exports = { Event }
