'use strict';

const mongoose = require('mongoose')

const ApplicantSchema = new mongoose.Schema({
    resumeId: {
        type: String,
        required: true,
        minlength: 1
    },
    fullName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    year: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    program: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    fridays: {
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
    otherPositions: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    statement: {
        type: String,
        required: true,
        minlength: 1
    },
    viewed: {
        type: String,
        required: true,
        minlength: 1
    },
});

// make a model using the schema
const Applicant = mongoose.model('Applicant', ApplicantSchema)
module.exports = { Applicant }
