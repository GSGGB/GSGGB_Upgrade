/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();

//const cors = require("cors");
//app.use(cors());

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { User } = require("./models/user");
const { Image } = require("./models/image");
const { Announcement } = require("./models/announcement");
const { Research } = require("./models/research");
const { Executive } = require("./models/executive");
const { Event } = require("./models/event");
const { Sponsor } = require("./models/sponsor");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling **************************************/
// Create a session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true
        }
    })
);

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'gsggb',
    api_key: '289885175397897',
    api_secret: 'FOR8MHeaag5E6_L5f9Xe7gHFVPE'
});

// =============================================================================

/** Start of user resource routes **/
// A POST route to login and create a session.
app.post("/userDatabase/login", (req, res) => {
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
app.get("/userDatabase/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send();
        }
    });
});

// A GET route to check if a use is logged in on the session cookie.
app.get("/userDatabase/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ username: req.session.username });
    } else {
        res.status(401).send();
    }
});


// A GET route to get ALL users.
app.get("/userDatabase", (req, res) => {
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
app.get("/userDatabase/:id", (req, res) => {
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
app.post("/userDatabase", (req, res) => {
    // Create a new user using the User mongoose model
    const user = new User({
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
app.patch("/userDatabase/:id", (req, res) => {
    const id = req.params.id;

    const body = {
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
});

// A DELETE route to delete a user by their id.
app.delete("/userDatabase/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    User.findByIdAndRemove(id)
        .then((user) => {
            if (!user) {
                res.status(404).send();
            } else {
                res.send(user);
            }
        })
        .catch((error) => {
            res.status(500).send(); // Server error, could not delete.
        });
});
/** End of user resource routes **/


/** Start of announcement resource routes **/
// A GET route to get ALL announcements.
app.get("/announcementDatabase", (req, res) => {
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
app.get("/announcementDatabase/:id", (req, res) => {
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
app.post("/announcementDatabase", (req, res) => {
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
app.patch("/announcementDatabase/:id", (req, res) => {
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
app.delete("/announcementDatabase/:id", (req, res) => {
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


/** Start of research post resource routes **/
// A GET route to get ALL research posts.
app.get("/researchDatabase", (req, res) => {
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
app.get("/researchDatabase/:id", (req, res) => {
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
app.post("/researchDatabase", (req, res) => {
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
app.patch("/researchDatabase/:id", (req, res) => {
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
app.delete("/researchDatabase/:id", (req, res) => {
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


/** Start of executive resource routes **/
// A GET route to get ALL executives.
app.get("/executiveDatabase", (req, res) => {
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
app.get("/executiveDatabase/:id", (req, res) => {
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
app.post("/executiveDatabase", (req, res) => {
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
app.patch("/executiveDatabase/:id", (req, res) => {
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
app.delete("/executiveDatabase/:id", (req, res) => {
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


/** Start of event resource routes **/
// A GET route to get ALL events.
app.get("/eventDatabase", (req, res) => {
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
app.get("/eventDatabase/:id", (req, res) => {
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
app.post("/eventDatabase", (req, res) => {
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
app.patch("/eventDatabase/:id", (req, res) => {
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
app.delete("/eventDatabase/:id", (req, res) => {
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


/** Start of sponsor resource routes **/
// A GET route to get ALL sponsors.
app.get("/sponsorDatabase", (req, res) => {
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
app.get("/sponsorDatabase/:id", (req, res) => {
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
app.post("/sponsorDatabase", (req, res) => {
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
app.patch("/sponsorDatabase/:id", (req, res) => {
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
app.delete("/sponsorDatabase/:id", (req, res) => {
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


/** Start of image resource routes **/
// A GET route to get an image by their id.
app.get("/imageDatabase/:id", (req, res) => {
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
app.post("/imageDatabase", multipartMiddleware, (req, res) => {

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
app.delete("/imageDatabase/:id", (req, res) => {
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

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
