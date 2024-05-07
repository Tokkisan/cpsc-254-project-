
let currentUser = '';


async function authenticate(request, response, databaseFunctions, dbConnection) {
    // get the email from the sign-in page
    let email = request.body.email;
    user = request.body.email;
    // get the password from the sign-in page
    let pswd = request.body.pswd;

    currentUser = request.body.email;
    console.log("this is user from server_functions", user)

    // search the database for the email and
    // pull the password from the database
    let retrievedPswd = await databaseFunctions.retrieveAccount(email, dbConnection);

    // make sure that the pulled and given passwords match
    if (pswd === retrievedPswd) {
        // if match...
        response.sendFile(__dirname + "/public/main_todo_page.html");
    }
    else {
        // if passwords don't match...
        console.log("Passwords don't match");
    }
}



function createAccount(request, response, databaseFunctions, dbConnection) {
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
        databaseFunctions.addAccount(email, pswd, dbConnection);
        // go to the main page
        response.sendFile(__dirname + "/public/main_todo_page.html");
    }
    else {
        console.log("Passwords don't match");
    }
    // note: email input type automatically validates according to https://www.w3schools.com/tags/att_input_type_email.asp
}

function getUser() {
    return currentUser;
}

module.exports = {authenticate, createAccount, getUser};
