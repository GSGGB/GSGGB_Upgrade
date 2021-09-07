const express = require('express');
const router = express.Router();

const { Executive } = require("../models/executive");
const { ObjectID } = require("mongodb"); // To validate object IDs

// Authentication middleware to check if user is logged in.
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.status(401).send();
    }
}

/** Start of executive resource routes **/
// A GET route to get ALL executives.
router.get("/", (req, res) => {
    Executive.find().then(
        (allExecutives) => {
            res.send({ allExecutives });
        },
        (error) => {
            res.status(500).send(error); // Server error, could not get.
        }
    );
});

// A GET route to get an executive by their id.
router.get("/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Executive.findById(id)
        .then((executive) => {
            if (!executive) {
                res.status(404).send();
            } else {
                res.send(executive);
            }
        })
        .catch((error) => {
            res.status(500).send(); // Server error, could not get.
        });
});

// A POST route to create an executive.
router.post("/", isAuthenticated, (req, res) => {
    const executive = new Executive({
        userId: req.session.user,
        imageId: req.body.imageId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        team: req.body.team,
        position: req.body.position,
        biography: req.body.biography,
        linkedin: req.body.linkedin,
        email: req.body.email
    });

    // Save executive to the database.
    executive.save().then(
        (result) => {
            res.send(result);
        },
        (error) => {
            res.status(400).send(error); // 400 for bad request.
        }
    );
});

// A PATCH route to edit an executive by their id.
router.patch("/:id", isAuthenticated, (req, res) => {
    const id = req.params.id;

    const body = {
        userId: req.session.user,
        imageId: req.body.imageId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        team: req.body.team,
        position: req.body.position,
        biography: req.body.biography,
        linkedin: req.body.linkedin,
        email: req.body.email
    };

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Executive.findByIdAndUpdate(id, { $set: body })
        .then((executive) => {
            if (!executive) {
                res.status(404).send();
            } else {
                res.send(executive);
            }
        })
        .catch((error) => {
            res.status(400).send(); // 400 for bad request.
        });
});

// A DELETE route to delete an executive by their id.
router.delete("/:id", isAuthenticated, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Executive.findByIdAndRemove(id)
        .then((executive) => {
            if (!executive) {
                res.status(404).send();
            } else {
                res.send(executive);
            }
        })
        .catch((error) => {
            res.status(500).send(); // Server error, could not delete.
        });
});
/** End of executive resource routes **/

module.exports = router;
