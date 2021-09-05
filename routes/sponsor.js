const express = require('express');
const router = express.Router();

const { Sponsor } = require("../models/sponsor");
const { ObjectID } = require("mongodb"); // To validate object IDs

/** Start of sponsor resource routes **/
// A GET route to get ALL sponsors.
router.get("/", (req, res) => {
    Sponsor.find().then(
        (allSponsors) => {
            res.send({ allSponsors });
        },
        (error) => {
            res.status(500).send(error); // Server error, could not get.
        }
    );
});

// A GET route to get a sponsor by their id.
router.get("/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Sponsor.findById(id)
        .then((sponsor) => {
            if (!sponsor) {
                res.status(404).send();
            } else {
                res.send(sponsor);
            }
        })
        .catch((error) => {
            res.status(500).send(); // Server error, could not get.
        });
});

// A POST route to create a sponsor.
router.post("/", (req, res) => {
    const sponsor = new Sponsor({
        userId: req.session.user,
        imageId: req.body.imageId,
        type: req.body.type,
        name: req.body.name,
        link: req.body.link,
        width: req.body.width,
        height: req.body.height,
        marginLeft: req.body.marginLeft,
        marginRight: req.body.marginRight,
        marginTop: req.body.marginTop,
        marginBottom: req.body.marginBottom
    });

    // Save sponsor to the database.
    sponsor.save().then(
        (result) => {
            res.send(result);
        },
        (error) => {
            res.status(400).send(error); // 400 for bad request.
        }
    );
});

// A PATCH route to edit a sponsor by their id.
router.patch("/:id", (req, res) => {
    const id = req.params.id;

    const body = {
        imageId: req.body.imageId,
        type: req.body.type,
        name: req.body.name,
        link: req.body.link,
        width: req.body.width,
        height: req.body.height,
        marginLeft: req.body.marginLeft,
        marginRight: req.body.marginRight,
        marginTop: req.body.marginTop,
        marginBottom: req.body.marginBottom
    };

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Sponsor.findByIdAndUpdate(id, { $set: body })
        .then((sponsor) => {
            if (!sponsor) {
                res.status(404).send();
            } else {
                res.send(sponsor);
            }
        })
        .catch((error) => {
            res.status(400).send(); // 400 for bad request.
        });
});

// A DELETE route to delete a sponsor by their id.
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Sponsor.findByIdAndRemove(id)
        .then((sponsor) => {
            if (!sponsor) {
                res.status(404).send();
            } else {
                res.send(sponsor);
            }
        })
        .catch((error) => {
            res.status(500).send(); // Server error, could not delete.
        });
});
/** End of sponsor resource routes **/

module.exports = router;
