const express = require('express');
const router = express.Router();

const { Applicant } = require("../models/applicant");
const { ObjectID } = require("mongodb"); // To validate object IDs

/** Start of applicant resource routes **/
// A GET route to get ALL applications.
router.get("/", (req, res) => {
    Applicant.find().then(
        (applicants) => {
            res.send({ applicants });
        },
        (error) => {
            res.status(500).send(error); // Server error, could not get.
        }
    );
});

// A GET route to get an application by their id.
router.get("/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Applicant.findById(id)
        .then((applicant) => {
            if (!applicant) {
                res.status(404).send();
            } else {
                res.send(applicant);
            }
        })
        .catch((error) => {
            res.status(500).send(); // Server error, could not get.
        });
});

// A POST route to create/send an application.
router.post("/", (req, res) => {
    const applicant = new Applicant({
        resumeId: req.body.resumeId,
        fullName: req.body.fullName,
        email: req.body.email,
        year: req.body.year,
        program: req.body.program,
        fridays: req.body.fridays,
        team: req.body.team,
        position: req.body.position,
        otherPositions: req.body.otherPositions,
        statement: req.body.statement,
        flagged: req.body.flagged,
        submissionDate: new Date()
    });

    // Save executive to the database.
    applicant.save().then(
        (result) => {
            res.send(result);
        },
        (error) => {
            res.status(400).send(error); // 400 for bad request.
        }
    );
});

// A PATCH route to edit an application by their id.
router.patch("/:id", (req, res) => {
    const id = req.params.id;

    const body = {
        resumeId: req.body.resumeId,
        fullName: req.body.fullName,
        email: req.body.email,
        year: req.body.year,
        program: req.body.program,
        fridays: req.body.fridays,
        team: req.body.team,
        position: req.body.position,
        otherPositions: req.body.otherPositions,
        statement: req.body.statement,
        flagged: req.body.flagged,
        submissionDate: req.body.submissionDate
    };

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Applicant.findByIdAndUpdate(id, { $set: body })
        .then((applicant) => {
            if (!applicant) {
                res.status(404).send();
            } else {
                res.send(applicant);
            }
        })
        .catch((error) => {
            res.status(400).send(); // 400 for bad request.
        });
});

// A DELETE route to delete an application by their id.
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Applicant.findByIdAndRemove(id)
        .then((applicant) => {
            if (!applicant) {
                res.status(404).send();
            } else {
                res.send(applicant);
            }
        })
        .catch((error) => {
            res.status(500).send(); // Server error, could not delete.
        });
});
/** End of applicant resource routes **/

module.exports = router;
