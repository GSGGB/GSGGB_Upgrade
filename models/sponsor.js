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
        minlength: 1,
        trim: true
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    link: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    width: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
    height: {
        type: Number,
        minlength: 0,
        trim: true
    },
    marginLeft: {
        type: Number,
        minlength: 0,
        trim: true
    },
    marginRight: {
        type: Number,
        minlength: 0,
        trim: true
    },
    marginTop: {
        type: Number,
        minlength: 0,
        trim: true
    },
    marginBottom: {
        type: Number,
        minlength: 0,
        trim: true
    }
});

// Find sponsors created by userId.
SponsorSchema.statics.findByUserId = function(userId) {
    const Sponsor = this;

    return Sponsor.findOne({ userId: userId }).then((sponsor) => {
        if (!sponsor) {
            return Promise.reject();
        } else{
            return Promise.resolve(sponsor);
        }
    });
};

// make a model using the schema
const Sponsor = mongoose.model('Sponsor', SponsorSchema)
module.exports = { Sponsor }
