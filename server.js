/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require("express");
const serverless = require("serverless-http");
// starting the express server
const app = express();

//const cors = require("cors");
//app.use(cors());

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// routes
const announcement = require("./routes/announcement");
const applicant = require("./routes/applicant");
const gEvent = require("./routes/event");
const executive = require("./routes/executive");
const image = require("./routes/image");
const position = require("./routes/position");
const research = require("./routes/research");
const resume = require("./routes/resume");
const sponsor = require("./routes/sponsor");
const user = require("./routes/user");

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
        secret: process.env.COOKIE_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true
        }
    })
);

// =============================================================================

app.use("/.netlify/functions/announcementDatabase", announcement);
app.use("/.netlify/functions/applicantDatabase", applicant);
app.use("/.netlify/functions/eventDatabase", gEvent);
app.use("/.netlify/functions/executiveDatabase", executive);
app.use("/.netlify/functions/imageDatabase", image);
app.use("/.netlify/functions/positionDatabase", position);
app.use("/.netlify/functions/researchDatabase", research);
app.use("/.netlify/functions/resumeDatabase", resume);
app.use("/.netlify/functions/sponsorDatabase", sponsor);
app.use("/.netlify/functions/userDatabase", user);

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

module.exports.handler = serverless(app);
