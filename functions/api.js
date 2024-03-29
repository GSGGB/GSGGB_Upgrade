/* server.js for react-express-authentication */
"use strict";

const path = require("path");
const express = require("express");
const serverless = require("serverless-http");
// starting the express server
const app = express();

//const cors = require("cors");
//app.use(cors());

// mongoose and mongo connection
const { mongoose } = require("../db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// routes
const announcement = require("../routes/announcement");
const applicant = require("../routes/applicant");
const gEvent = require("../routes/event");
const executive = require("../routes/executive");
const image = require("../routes/image");
const position = require("../routes/position");
const research = require("../routes/research");
const resume = require("../routes/resume");
const sponsor = require("../routes/sponsor");
const user = require("../routes/user");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

const MongoStore = require("connect-mongo");
// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/GSGGB_API'

/*** Session handling **************************************/
// Create a session cookie
app.use(
    session({
        secret: process.env.COOKIE_SESSION_SECRET,
        store: MongoStore.create({ mongoUrl: mongoURI })
    })
);

// =============================================================================

app.use("/.netlify/functions/api/announcementDatabase", announcement);
app.use("/.netlify/functions/api/applicantDatabase", applicant);
app.use("/.netlify/functions/api/eventDatabase", gEvent);
app.use("/.netlify/functions/api/executiveDatabase", executive);
app.use("/.netlify/functions/api/imageDatabase", image);
app.use("/.netlify/functions/api/positionDatabase", position);
app.use("/.netlify/functions/api/researchDatabase", research);
app.use("/.netlify/functions/api/resumeDatabase", resume);
app.use("/.netlify/functions/api/sponsorDatabase", sponsor);
app.use("/.netlify/functions/api/userDatabase", user);

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "../client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../client/build") });
});

/*************************************************/

module.exports = app;
module.exports.handler = serverless(app);
