function addAccount(email, password) {
    // add the email and password to the database
    send("Account has been added");
}

function retrieveAccount(email) {
    // search the database by the email provided
    send("Verified");
    // return the password from the table
}

module.exports = {addAccount};
module.exports = {retrieveAccount};