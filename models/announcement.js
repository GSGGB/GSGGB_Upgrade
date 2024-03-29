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
        minlength: 1,
        trim: true
    }
});

// Find announcements created by userId.
AnnouncementSchema.statics.findByUserId = function(userId) {
    const Announcement = this;

    return Announcement.findOne({ userId: userId }).then((announcement) => {
        if (!announcement) {
            return Promise.reject();
        } else{
            return Promise.resolve(announcement);
        }
    });
};

// make a model using the schema
const Announcement = mongoose.model('Announcement', AnnouncementSchema)
module.exports = { Announcement }
