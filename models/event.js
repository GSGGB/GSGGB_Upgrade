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
        required: true,
        minlength: 1
    },
    imageOrientation: {
        type: String,
        required: true,
        minlength: 1
    },
    type: {
        type: String,
        required: true,
        minlength: 1
    },
    title: {
        type: String,
        required: true,
        minlength: 1
    },
    date: {
        type: String,
        required: true,
        minlength: 1
    },
    startTime: {
        type: String,
        required: true,
        minlength: 1
    },
    endTime: {
        type: String,
        required: true,
        minlength: 1
    },
    location: {
        type: String,
        required: true,
        minlength: 1
    },
    content: {
        type: String,
        required: true,
        minlength: 1
    },
    fbEventLink: {
        type: String,
        minlength: 0
    },
    eventbriteLink: {
        type: String,
        minlength: 0
    },
    zoomLink: {
        type: String,
        minlength: 0
    }
})

// make a model using the schema
const Event = mongoose.model('Event', EventSchema)
module.exports = { Event }
