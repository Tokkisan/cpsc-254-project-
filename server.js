// import the functions from database_functions to handle the database
const {addAccount} = require('./database_functions.js');
const {retrieveAccount} = require('./database_functions.js');
const {addToDo} = require('./database_functions.js');
const {retrieveToDoReminders} = require('./database_functions.js');
const {initialSetup} = require('./database_functions.js')
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
    user: " ",
    password: " "
});

// connect to the MySQL database and set up the initial database and login table
dbConnection.connect(function(error) {
    if (error) throw error;
    console.log("Successfully connected to the database");
    
    // see if the database and tables already exist
    dbConnection.query("SHOW DATABASES LIKE 'toDoDb'", function(error, result) {
        if (error) {
            throw error;
        } else if (result.isEmpty()) { // if no such database exists
            initialSetup(dbConnection); // create our database and tables to keep track of our users
        }
        else {
            console.log("The database exists");
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
    // get the email from the sign-in page
    let email = request.body.email;
    user = request.body.email;
    // get the password from the sign-in page
    let pswd = request.body.pswd;

    // search the database for the email and
    // pull the password from the database
    let retrievedPswd = retrieveAccount(email, dbConnection);

    // make sure that the pulled and given passwords match
    if (pswd === retrievedPswd) {
        // if match...
        response.sendFile(__dirname + "/public/main_todo_page.html");
    }
    else {
        // if passwords don't match...
        alert("Please enter the correct username and password");
    }
});

// handle the data returned from the sign-up page
toDo.post("/sign_up", function(request, response) {
    // get the email from the sign-up page
    let email = request.body.email;
    user = request.body.email;
    // get the password from the sign-up page
    let pswd = request.body.pswd;
    // get the second password for verification
    let pswdV = request.body.pswdVerification;

    // make sure that the two passwords match
    if (pswd === pswdV) {
        // store email and password in database
        addAccount(email, pswd, dbConnection);
        // go to the main page
        response.sendFile(__dirname + "/public/main_todo_page.html");
    }
    else {
        alert("Please ensure that both passwords match");
    }
    // note: email input type automatically validates according to https://www.w3schools.com/tags/att_input_type_email.asp
});

toDo.post("/addPost", function(request, response) {
    // get the string from the form
    let reminder = request.body.todo_input;

    // put the string in the database
    addToDo(user, reminder, dbConnection);
})

toDo.post("/showPosts", function(request, response) {
    // direct user to a page where they can view previous to-dos
    response.sendFile(__dirname + "/public/view_todo_page.html");
})

// listen on localhost: 3000
toDo.listen(3000);

// print a message to let the user know the server is working
console.log("Server is listening. Please go to localhost:3000");