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
});

// Find research posts created by userId.
ResearchSchema.statics.findByUserId = function(userId) {
    const Research = this;

    return Research.findOne({ userId: userId }).then((researchPost) => {
        if (!researchPost) {
            return Promise.reject();
        } else{
            return Promise.resolve(researchPost);
        }
    });
};

// make a model using the schema
const Research = mongoose.model('Research', ResearchSchema)
module.exports = { Research }
