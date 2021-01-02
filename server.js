/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { User } = require("./models/user");
const { Announcement } = require("./models/announcement");
const { Research } = require("./models/research");

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
                    accountType: user.accountType
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
        execPosition: req.body.execPosition
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
