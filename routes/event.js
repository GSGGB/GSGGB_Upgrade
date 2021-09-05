const express = require('express');
const router = express.Router();

const { Event } = require("../models/event");
const { ObjectID } = require("mongodb"); // To validate object IDs

/** Start of event resource routes **/
// A GET route to get ALL events.
router.get("/", (req, res) => {
    (Event.find().sort({ "date": 1 })).then(
        (allEvents) => {
            res.send({ allEvents });
        },
        (error) => {
            res.status(500).send(error); // Server error, could not get.
        }
    );
});

// A GET route to get an event by their id.
router.get("/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Event.findById(id)
        .then((gEvent) => {
            if (!gEvent) {
                res.status(404).send();
            } else {
                res.send(gEvent);
            }
        })
        .catch((error) => {
            res.status(500).send(); // Server error, could not get.
        });
});

// A POST route to create an event.
router.post("/", (req, res) => {
    const gEvent = new Event({
        userId: req.session.user,
        imageId: req.body.imageId,
        imageOrientation: req.body.imageOrientation,
        type: req.body.type,
        title: req.body.title,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        location: req.body.location,
        content: req.body.content,
        fbEventLink: req.body.fbEventLink,
        eventbriteLink: req.body.eventbriteLink,
        zoomLink: req.body.zoomLink,
        lastUpdated: new Date()
    });

    // Save event to the database.
    gEvent.save().then(
        (result) => {
            res.send(result);
        },
        (error) => {
            res.status(400).send(error); // 400 for bad request.
        }
    );
});

// A PATCH route to edit an event by their id.
router.patch("/:id", (req, res) => {
    const id = req.params.id;

    const body = {
        imageId: req.body.imageId,
        imageOrientation: req.body.imageOrientation,
        type: req.body.type,
        title: req.body.title,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        location: req.body.location,
        content: req.body.content,
        fbEventLink: req.body.fbEventLink,
        eventbriteLink: req.body.eventbriteLink,
        zoomLink: req.body.zoomLink,
        lastUpdated: new Date()
    };

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Event.findByIdAndUpdate(id, { $set: body })
        .then((gEvent) => {
            if (!gEvent) {
                res.status(404).send();
            } else {
                res.send(gEvent);
            }
        })
        .catch((error) => {
            res.status(400).send(); // 400 for bad request.
        });
});

// A DELETE route to delete an event by their id.
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Event.findByIdAndRemove(id)
        .then((gEvent) => {
            if (!gEvent) {
                res.status(404).send();
            } else {
                res.send(gEvent);
            }
        })
        .catch((error) => {
            res.status(500).send(); // Server error, could not delete.
        });
});
/** End of event resource routes **/

module.exports = router;
