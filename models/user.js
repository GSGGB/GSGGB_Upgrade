/* User model */
'use strict';

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const UserSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    accountType: {
        type: String,
        required: true,
        trim: true
    },
    executivePosition: {
        type: String,
        required: true,
        trim: true
    },
    deactivated: {
        type: Boolean,
        required: true,
        trim: true
    }
});

// An example of Mongoose middleware.
// This function will run immediately prior to CREATING AND SAVING the document
// in the database.
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})


// This function will run immediately prior to UPDATING the document
// in the database.
UserSchema.pre('findOneAndUpdate', function(next) {
    const user = this._update;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.$set.password, salt, (err, hash) => {
          user.$set.password = hash
          next()
        })
    })
})


// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
// to a given one, for example when logging in.
UserSchema.statics.findByUsernamePassword = function(username, password) {
    const User = this; // binds this to the User model

    // First find the user by their username
    return User.findOne({ username: username }).then((user) => {
        if (!user) {
            return Promise.reject(); // a rejected promise
        }
        // if the user exists, make sure their password is correct
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

// make a model using the schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }
