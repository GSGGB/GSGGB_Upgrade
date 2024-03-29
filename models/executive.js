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
        minlength: 1,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    team: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    position: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    biography: {
        type: String,
        required: true,
        minlength: 1
    },
    linkedin: {
        type: String,
        minlength: 0,
        trim: true
    },
    email: {
        type: String,
        minlength: 0,
        trim: true
    }
});

// Find executives created by userId.
ExecutiveSchema.statics.findByUserId = function(userId) {
    const Executive = this;

    return Executive.findOne({ userId: userId }).then((executive) => {
        if (!executive) {
            return Promise.reject();
        } else{
            return Promise.resolve(executive);
        }
    });
};

// make a model using the schema
const Executive = mongoose.model('Executive', ExecutiveSchema)
module.exports = { Executive }
