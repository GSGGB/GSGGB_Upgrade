'use strict';
const log = console.log;

const app = require('./functions/server');

// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
