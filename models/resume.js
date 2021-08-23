'use strict';

const mongoose = require('mongoose')

const ResumeSchema = new mongoose.Schema({
    resumeId: {
        type: String,
        required: true,
        minlength: 1
    },
    resumeURL: {
        type: String,
        required: true,
        minlength: 1
    }
});

// make a model using the schema
const Resume = mongoose.model('Resume', ResumeSchema)
module.exports = { Resume }
