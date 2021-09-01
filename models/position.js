'use strict';

const mongoose = require('mongoose')

const PositionSchema = new mongoose.Schema({
    team: {
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
    dateAdded: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

// make a model using the schema
const Position = mongoose.model('Position', PositionSchema)
module.exports = { Position }
