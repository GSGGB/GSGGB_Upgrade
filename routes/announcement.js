const express = require('express');
const router = express.Router();

const { Announcement } = require("../models/announcement");
const { ObjectID } = require("mongodb"); // To validate object IDs

// Authentication middleware to check if user is logged in.
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.status(401).send();
    }
}

/** Start of announcement resource routes **/
// A GET route to get ALL announcements.
router.get("/", (req, res) => {
    Announcement.find().then(
        (announcements) => {
            res.send({ announcements });
        },
        (error) => {
            res.status(500).send(error); // Server error, could not get.
        }
    );
});

// A GET route to get an announcement by their id.
router.get("/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Announcement.findById(id)
        .then((announcement) => {
            if (!announcement) {
                res.status(404).send();
            } else {
                res.send(announcement);
            }
        })
        .catch((error) => {
            res.status(500).send(); // Server error, could not get.
        });
});

// A POST route to create an announcement.
router.post("/", isAuthenticated, (req, res) => {
    const announcement = new Announcement({
        userId: req.session.user,
        content: req.body.content,
        date: new Date()
    });

    // Save announcement to the database.
    announcement.save().then(
        (result) => {
            res.send(result);
        },
        (error) => {
            res.status(400).send(error); // 400 for bad request.
        }
    );
});

// A PATCH route to edit an announcement by their id.
router.patch("/:id", isAuthenticated, (req, res) => {
    const id = req.params.id;

    const { content } = req.body;
    const body = { content };

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Announcement.findByIdAndUpdate(id, { $set: body })
        .then((announcement) => {
            if (!announcement) {
                res.status(404).send();
            } else {
                res.send(announcement);
            }
        })
        .catch((error) => {
            res.status(400).send(); // 400 for bad request.
        });
});

// A DELETE route to delete an announcement by their id.
router.delete("/:id", isAuthenticated, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Announcement.findByIdAndRemove(id)
        .then((announcement) => {
            if (!announcement) {
                res.status(404).send();
            } else {
                res.send(announcement);
            }
        })
        .catch((error) => {
            res.status(500).send(); // Server error, could not delete.
        });
});
/** End of announcement resource routes **/

module.exports = router;
