// import the functions from database_functions to handle the database
const databaseFunctions = require('./database_functions.js');

// import the functions from server_functions to clean up server.js
const serverFunctions = require('./server_functions.js');

// This is the main server that the user will connect to and will redirect to the different files
// use Node.js to run the database

// set up the open source library/framework express for Node.js server
let express = require("express");
// set up the open-source library function body parser for parsing the 
// information submitted in the forms
let formParser = require("body-parser");
// for connecting to the MySQL database
let mySQL = require("mysql");
// start using express
// toDo is short for "Daily To-Do Reminder"
let toDo = express();
// for jumping between the pages
toDo.use(express.static(__dirname + "/public"));

// activate the body parser library
toDo.use(formParser.urlencoded({extended:true}));

// current user -> global variable for time constrait -> usually a cookie
let user = "";

// create the connection to the database
let dbConnection = mySQL.createConnection({
    host: "localhost",
    user: "",
    password: ""
});

// connect to the MySQL database and set up the initial database and login table
dbConnection.connect(function(error) {
    if (error) throw error;
    console.log("Successfully connected to the database");
    
    // see if the database and tables already exist
    dbConnection.query("SHOW DATABASES;", function(error, result) {
        if (error) {
            throw error;
        } 
        
        let found = false;

        for (let i = 0; i < result.length; i++) {
            if (result[i].Database == "toDoDb") {
                found = true;
            }
        }

        if (found == true) {
            console.log("Database exists");
        }
        else if (found == false) { // if no such database exists
            console.log("Database does not exist");
            console.log("Setting up database and tables");
            databaseFunctions.initialSetup(dbConnection); // create our database and tables to keep track of our users
        }
        else {
            console.log("Error reading from MySQL");
        }
    });
});



// direct to the sign-in page when accessing localhost
toDo.get("/", function(request, response) {
    // direct to the sign-in page
    response.sendFile(__dirname + "/index.html");
});

// handle the data returned from the sign-in page
toDo.post("/sign_in", function(request, response) {
    serverFunctions.authenticate(request, response, databaseFunctions, dbConnection);
});

// handle the data returned from the sign-up page
toDo.post("/sign_up", function(request, response) {
    // get the email from the sign-up page for the pseudo-cookie
    user = request.body.email;
    
    // create the account in the database
    serverFunctions.createAccount(request, response, databaseFunctions, dbConnection);
});

toDo.post("/addPost", function(request, response) {
    // get the string from the form
    let reminder = request.body.todo_input;

    // put the string in the database
    databaseFunctions.addToDo(user, reminder, dbConnection);
})

toDo.post("/showPosts", async function(request, response) {
    // direct user to a page where they can view previous to-dos
    console.log("button pressed for getting todos");
    let todos = await databaseFunctions.retrieveToDoReminders(user, dbConnection);
    console.log("To-do reminders:", todos);

    response.sendFile(__dirname + "/public/view_todo_page.html");
})

// listen on localhost: 3000
toDo.listen(3000);

// print a message to let the user know the server is working
console.log("Server is listening. Please go to localhost:3000");
