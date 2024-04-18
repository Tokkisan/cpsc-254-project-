function initialSetup(dbConnection) {
    // create our database
    dbConnection.query("CREATE DATABASE toDoDb", function(error, result) {
        if (error) throw error;
        console.log("Created database toDoDb");
    });

    // create our accounts table
    let sqlCommand = "CREATE TABLE accounts (email VARCHAR(255) PRIMARY KEY, password VARCHAR(255))";
    dbConnection.query(sqlCommand, function(error, result) {
        if (error) throw error;
        console.log("Successfully create accounts table!");
    });
}

function addAccount(email, password, dbConnection) {
    // connect to the database
    dbConnection.connect(function(error) {
        if (error) throw error;
        console.log("Successfully connected to the database");
        
        // add the email and password to the accounts table
        let sqlCommand = "INSERT INTO accounts (email, password) VALUES ('" + email + ", '" + password + "')";
        dbConnection.query(sqlCommand, function(error, result) {
            if (error) throw error;
            console.log("Added new user to the accounts table")
        });

        // create a table for the user
        sqlCommand = "CREATE TABLE " + email + " (id INT AUTO_INCREMENT PRIMARY KEY, reminder VARCHAR(255))";
        dbConnection.query(sqlCommand, function(error, result) {
            if (error) throw error;
            console.log("Created user's table in database");
        });
    });
}

function retrieveAccount(email, dbConnection) {
    let retrievedPassword = "";
    
    // connect to the database
    dbConnection.connect(function(error) {
        if (error) throw error;
        console.log("Successfully connected to the database");
        
        // retrieve all emails and passwords to the accounts table
        let sqlCommand = "SELECT email, password FROM accounts";
        dbConnection.query(sqlCommand, function(error, tableRows, tableInfo) {
            if (error) throw error;
            
            // search the rows from the table for the matching email
            for(let index = 0; index < tableRows.length(); index++) {
                if (tableRows[index].email == email) {
                    retrievedPassword = tableRows[index].password;
                }
            }
        });
    });

    // return the password
    return retrievedPassword;
}

function addToDo(user, toDoReminder, dbConnection) {
    // connect to the database
    dbConnection.connect(function(error) {
        if (error) throw error;
        console.log("Successfully connected to the database");

        // add the reminder to the database
        let sqlCommand = "INSERT INTO " + user + " (reminder) VALUES ('" + toDoReminder + "')";
        dbConnection.query(sqlCommand, function(error, result) {
            if (error) throw error;
            console.log("Added reminder to the database");
        });
    });
}

function retrieveToDoReminders() {
    // retrieve all of the reminders from the database for displaying
}

module.exports = {initialSetup};
module.exports = {addAccount};
module.exports = {retrieveAccount};
module.exports = {addToDo};
module.exports = {retrieveToDoReminders};