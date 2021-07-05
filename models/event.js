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
        minlength: 1,
        trim: true
    },
    type: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    date: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    startTime: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    endTime: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    location: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    fbEventLink: {
        type: String,
        minlength: 0,
        trim: true
    },
    eventbriteLink: {
        type: String,
        minlength: 0,
        trim: true
    },
    zoomLink: {
        type: String,
        minlength: 0,
        trim: true
    },
    lastUpdated: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

// Find events created by userId.
EventSchema.statics.findByUserId = function(userId) {
    const Event = this;

    return Event.findOne({ userId: userId }).then((gEvent) => {
        if (!gEvent) {
            return Promise.reject();
        } else{
            return Promise.resolve(gEvent);
        }
    });
};

// make a model using the schema
const Event = mongoose.model('Event', EventSchema)
module.exports = { Event }
