'use strict';

const mongoose = require('mongoose')

const AnnouncementSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 1
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
const Announcement = mongoose.model('Announcement', AnnouncementSchema)
module.exports = { Announcement }
