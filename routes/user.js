const express = require('express');
const router = express.Router();

const { User } = require("../models/user");
const { ObjectID } = require("mongodb"); // To validate object IDs

const { Announcement } = require("../models/announcement");
const { Research } = require("../models/research");
const { Executive } = require("../models/executive");
const { Event } = require("../models/event");
const { Sponsor } = require("../models/sponsor");

// Authentication middleware to check if user is logged in.
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.status(401).send();
    }
}

/** Start of user resource routes **/
// A POST route to login and create a session.
router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Use the static method on the User model to find a user
    // by their username and password
    User.findByUsernamePassword(username, password)
        .then((user) => {
            if (user) {
                // Add the user's id to the session cookie.
                // We can check later if this exists to ensure we are logged in.
                req.session.user = user._id;
                req.session.username = user.username;
                res.send({
                    username: user.username,
                    accountType: user.accountType,
                    deactivated: user.deactivated
                });
            }
        })
        .catch((error) => {
            res.status(400).send();
        });
});

// A GET route to logout a user.
router.get("/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send();
        }
    });
});

// A GET route to check if a user is logged in on the session cookie.
router.get("/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ username: req.session.username });
    } else {
        res.status(401).send();
    }
});


// A GET route to get ALL users.
router.get("/", isAuthenticated, (req, res) => {
    User.find().then(
        (users) => {
            res.send({ users });
        },
        (error) => {
            res.status(500).send(error); // Server error, could not get.
        }
    );
});

// A GET route to *retrieve* a user account's details.
router.get("/:id", (req, res) => {
    const id = req.params.id;

    // Check if the username we want exists
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    User.findById(id)
        .then((user) => {
            if (!user) {
                res.status(404).send();
            } else {
                res.send(user);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

// A POST route to create a user account.
router.post("/", isAuthenticated, (req, res) => {
    // Create a new user using the User mongoose model
    const user = new User({
        imageId: req.body.imageId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        accountType: req.body.accountType,
        executivePosition: req.body.executivePosition,
        deactivated: req.body.deactivated
    });

    // Save user to the database
    user.save().then(
        (result) => {
            res.send(result);
        },
        (error) => {
            res.status(400).send(error); // 400 for bad request
        }
    );
});

// A PATCH route to edit a user by their id.
router.patch("/:id", isAuthenticated, (req, res) => {
    const id = req.params.id;
    const username = req.body.username;
    const password = req.body.password;

    // Use the static method on the User model to find a user
    // by their username and password
    User.findByUsernamePassword(username, password)
        .then((user) => {
            // IMPORTANT: Only make edits to user if username and password are valid.
            if (user) {
                const body = {
                    imageId: req.body.imageId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    accountType: req.body.accountType,
                    executivePosition: req.body.executivePosition,
                    deactivated: req.body.deactivated
                };

                if (!ObjectID.isValid(id)) {
                    res.status(404).send();
                    return;
                }

                User.findByIdAndUpdate(id, { $set: body })
                    .then((user) => {
                        if (!user) {
                            res.status(404).send();
                        } else {
                            res.send(user);
                        }
                    })
                    .catch((error) => {
                        res.status(400).send(); // 400 for bad request.
                    });
              }
        })
        .catch((error) => {
            res.status(400).send();
        });
});

// A PATCH route to update a user's password.
router.patch("/password/:id", isAuthenticated, (req, res) => {
    const id = req.params.id;
    const username = req.body.username;
    const password = req.body.oldPassword;

    // Use the static method on the User model to find a user
    // by their username and password
    User.findByUsernamePassword(username, password)
        .then((user) => {
            // IMPORTANT: Only update password if username and old password are valid.
            if (user) {
                const body = {
                    imageId: req.body.imageId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.newPassword,
                    accountType: req.body.accountType,
                    executivePosition: req.body.executivePosition,
                    deactivated: req.body.deactivated
                };

                if (!ObjectID.isValid(id)) {
                    res.status(404).send();
                    return;
                }

                User.findByIdAndUpdate(id, { $set: body })
                    .then((user) => {
                        if (!user) {
                            res.status(404).send();
                        } else {
                            res.send(user);
                        }
                    })
                    .catch((error) => {
                        res.status(400).send(); // 400 for bad request.
                    });
            }
        })
        .catch((error) => {
            res.status(400).send();
        });
});

// A DELETE route to delete a user by their id.
router.delete("/:id", isAuthenticated, async(req, res) => {
    const id = req.params.id;
    const username = req.body.username;
    const password = req.body.password;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    var announcementExists = await Announcement.findByUserId(id)
        .then((announcement) => {
            if (announcement) {
                return true;
            } else{
                return false;
            }
        })
        .catch((error) => {});
    if (announcementExists){
        res.status(404).send();
        return;
    }

    var researchPostExists = await Research.findByUserId(id)
        .then((researchPost) => {
            if (researchPost) {
                return true;
            } else{
                return false;
            }
        })
        .catch((error) => {});
    if (researchPostExists){
        res.status(404).send();
        return;
    }

    var executivePostExists = await Executive.findByUserId(id)
        .then((executivePost) => {
            if (executivePost) {
                return true;
            } else{
                return false;
            }
        })
        .catch((error) => {});
    if (executivePostExists){
        res.status(404).send();
        return;
    }

    var eventExists = await Event.findByUserId(id)
        .then((gEvent) => {
            if (gEvent) {
                return true;
            } else{
                return false;
            }
        })
        .catch((error) => {});
    if (eventExists){
        res.status(404).send();
        return;
    }

    var sponsorExists = await Sponsor.findByUserId(id)
        .then((sponsor) => {
            if (sponsor) {
                return true;
            } else{
                return false;
            }
        })
        .catch((error) => {});
    if (sponsorExists){
        res.status(404).send();
        return;
    }

    User.findByUsernamePassword(username, password)
        .then((user) => {
            if (user) {
                User.findByIdAndRemove(id)
                    .then((user) => {
                        if (!user) {
                            res.status(404).send();
                        } else{
                            res.send(user);
                        }
                    })
                    .catch((error) => {
                        res.status(500).send();
                    });
            }
        })
        .catch((error) => {
            res.status(400).send();
        });
});
/** End of user resource routes **/

module.exports = router;
