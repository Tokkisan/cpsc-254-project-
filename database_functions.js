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

    // create the table to hold the todos
    sqlCommand = "CREATE TABLE todos (email VARCHAR(255), reminder VARCHAR(255), PRIMARY KEY(email, reminder))";
    dbConnection.query(sqlCommand, function(error, result) {
        if (error) throw error;
        console.log("Successfully created reminders table");
    });
}

function addAccount(email, password, dbConnection) {
    // connect to the database
    dbConnection.connect(function(error) {
        if (error) throw error;
        console.log("Successfully connected to the database for adding an account");
        
        // add the email and password to the accounts table
        let sqlCommand = "INSERT INTO accounts (email, password) VALUES ('" + email + ", '" + password + "')";
        dbConnection.query(sqlCommand, function(error, result) {
            if (error) throw error;
            console.log("Added new user to the accounts table")
        });
    });
}

function retrieveAccount(email, dbConnection) {
    let retrievedPassword = "";
    
    // connect to the database
    dbConnection.connect(function(error) {
        if (error) throw error;
        console.log("Successfully connected to the database for retrieving an account");

        // retrieve the password stored in the database that matches the user's email
        let sqlCommand = "SELECT password FROM accounts WHERE email = " + email;
        dbConnection.query(sqlCommand, function(error, result, tableInfo) {
            if (error) throw error;
            retrievedPassword = result;
            console.log("Successfully retrieved the password");
        });
        
        // retrieve all emails and passwords to the accounts table
        // let sqlCommand = "SELECT email, password FROM accounts";
        // dbConnection.query(sqlCommand, function(error, tableRows, tableInfo) {
        //     if (error) throw error;
            
        //     // search the rows from the table for the matching email
        //     for(let index = 0; index < tableRows.length(); index++) {
        //         if (tableRows[index].email == email) {
        //             retrievedPassword = tableRows[index].password;
        //         }
        //     }
        // });
    });

    // return the password
    return retrievedPassword;
}

function addToDo(user, toDoReminder, dbConnection) {
    // connect to the database
    dbConnection.connect(function(error) {
        if (error) throw error;
        console.log("Successfully connected to the database for adding a reminder");

        // add the reminder to the database
        let sqlCommand = "INSERT INTO todos (email, reminder) VALUES ('" + user + "', '" + toDoReminder + "')";
        dbConnection.query(sqlCommand, function(error, result) {
            if (error) throw error;
            console.log("Added reminder to the database");
        });
    });
}

function retrieveToDoReminders(user, dbConnection) {
    let userReminders = [];
    // connect to the database
    dbConnection.connect(function(error) {
        if (error) throw error;
        console.log("Successfully connected to the database for retrieving the reminders");

        // get the user-specific reminders from the database
        let sqlCommand = "SELECT reminder FROM todos WHERE email = " + user;
        dbConnection.query(sqlCommand, function(error, result, tableInfo) {
            if (error) throw error;
            userReminders = result;
            console.log("Successfully retrieved the user's reminders");
        }); 
    });

    // return the array containing the reminders stored in the database
    return userReminders;
}

module.exports = {initialSetup};
module.exports = {addAccount};
module.exports = {retrieveAccount};
module.exports = {addToDo};
module.exports = {retrieveToDoReminders};