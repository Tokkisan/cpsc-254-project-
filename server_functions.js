async function authenticate(request, response, databaseFunctions, dbConnection) {
    // get the email from the sign-in page
    let email = request.body.email;
    user = request.body.email;
    // get the password from the sign-in page
    let pswd = request.body.pswd;

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

module.exports = {authenticate};
