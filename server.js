// This is the main server that the user will connect to and will redirect to the different files
// use Node.js to run the database

// set up the open source library/framework express for Node.js server
let express = require('express');
// start using express
let app = express();

// listen on localhost: 3000
app.listen(3000);