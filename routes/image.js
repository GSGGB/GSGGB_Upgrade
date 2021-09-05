const express = require('express');
const router = express.Router();

const { Image } = require("../models/image");
const { ObjectID } = require("mongodb"); // To validate object IDs

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: 'gsggb',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/** Start of image resource routes **/
// A GET route to get an image by their id.
router.get("/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    Image.findById(id)
        .then((img) => {
            if (!img) {
                res.status(404).send();
            } else {
                res.send(img);
            }
        })
        .catch((error) => {
            res.status(500).send(); // Server error, could not get.
        });
});

// a POST route to *create* an image
router.post("/", multipartMiddleware, (req, res) => {

    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {

            // Create a new image using the Image mongoose model
            var img = new Image({
                imageId: result.public_id, // image id on cloudinary server
                imageURL: result.url, // image url on cloudinary server
            });

            // Save image to the database
            img.save().then(
                saveRes => {
                    res.send(saveRes);
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            );
        });
});


/// a DELETE route to remove an image by its id.
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    // Delete an image by its id (NOT the database ID, but its id on the cloudinary server)
    // on the cloudinary server
    cloudinary.uploader.destroy(id, function (result) {

        // Delete the image from the database
        Image.findOneAndRemove({ imageId: id })
            .then(img => {
                if (!img) {
                    res.status(404).send();
                } else {
                    res.send(img);
                }
            })
            .catch(error => {
                res.status(500).send(); // server error, could not delete.
            });
    });
});
/** End of image resource routes **/

module.exports = router;
