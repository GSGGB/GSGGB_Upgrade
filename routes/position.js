const express = require('express');
const router = express.Router();

const { Position } = require("../models/position");
const { ObjectID } = require("mongodb"); // To validate object IDs

/** Start of position resource routes **/
// A GET route to get ALL position titles in all teams.
router.get("/", (req, res) => {
    Position.find().then(
        (positions) => {
            res.send({ positions });
        },
        (error) => {
            res.status(500).send(error); // Server error, could not get.
        }
    );
});

// A POST route to create a new position title.
router.post("/", (req, res) => {
    const position = new Position({
        team: req.body.team,
        title: req.body.title,
        dateAdded: new Date()
    });

    // Save executive to the database.
    position.save().then(
        (result) => {
            res.send(result);
        },
        (error) => {
            res.status(400).send(error); // 400 for bad request.
        }
    );
});

// A DELETE route to delete a position title.
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Position.findByIdAndRemove(id)
        .then((position) => {
            if (!position) {
                res.status(404).send();
            } else {
                res.send(position);
            }
        })
        .catch((error) => {
            res.status(500).send(); // Server error, could not delete.
        });
});
/** End of position resource routes **/

module.exports = router;
