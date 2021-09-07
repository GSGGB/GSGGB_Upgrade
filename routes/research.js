const express = require('express');
const router = express.Router();

const { Research } = require("../models/research");
const { ObjectID } = require("mongodb"); // To validate object IDs

// Authentication middleware to check if user is logged in.
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.status(401).send();
    }
}

/** Start of research post resource routes **/
// A GET route to get ALL research posts.
router.get("/", (req, res) => {
    Research.find().then(
        (researchPosts) => {
            res.send({ researchPosts });
        },
        (error) => {
            res.status(500).send(error); // Server error, could not get.
        }
    );
});

// A GET route to get a research post by their id.
router.get("/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Research.findById(id)
        .then((researchPost) => {
            if (!researchPost) {
                res.status(404).send();
            } else {
                res.send(researchPost);
            }
        })
        .catch((error) => {
            res.status(500).send(); // Server error, could not get.
        });
});

// A POST route to create a research post.
router.post("/", isAuthenticated, (req, res) => {
    const researchPost = new Research({
        userId: req.session.user,
        url: req.body.url
    });

    // Save announcement to the database.
    researchPost.save().then(
        (result) => {
            res.send(result);
        },
        (error) => {
            res.status(400).send(error); // 400 for bad request.
        }
    );
});

// A PATCH route to edit a research post by their id.
router.patch("/:id", isAuthenticated, (req, res) => {
    const id = req.params.id;

    const { url } = req.body;
    const body = { url };

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Research.findByIdAndUpdate(id, { $set: body })
        .then((researchPost) => {
            if (!researchPost) {
                res.status(404).send();
            } else {
                res.send(researchPost);
            }
        })
        .catch((error) => {
            res.status(400).send(); // 400 for bad request.
        });
});

// A DELETE route to delete a research post by their id.
router.delete("/:id", isAuthenticated, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Research.findByIdAndRemove(id)
        .then((researchPost) => {
            if (!researchPost) {
                res.status(404).send();
            } else {
                res.send(researchPost);
            }
        })
        .catch((error) => {
            res.status(500).send(); // Server error, could not delete.
        });
});
/** End of research posts resource routes **/

module.exports = router;
