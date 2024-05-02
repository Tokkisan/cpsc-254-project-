function initialSetup(dbConnection) {
    // create our database
    dbConnection.query("CREATE DATABASE toDoDb;", function(error, result) {
        if (error) throw error;
        console.log("Created database toDoDb");
    });

    // create our accounts table
    let sqlCommand = "CREATE TABLE toDoDb.accounts (email VARCHAR(255) PRIMARY KEY, password VARCHAR(255));";
    dbConnection.query(sqlCommand, function(error, result) {
        if (error) throw error;
        console.log("Successfully create accounts table!");
    });

    // create the table to hold the todos
    sqlCommand = "CREATE TABLE toDoDb.todos (email VARCHAR(255), reminder VARCHAR(255), PRIMARY KEY(email, reminder));";
    dbConnection.query(sqlCommand, function(error, result) {
        if (error) throw error;
        console.log("Successfully created reminders table");
    });
}

function addAccount(email, password, dbConnection) {
    // add the email and password to the accounts table
    let sqlCommand = "INSERT INTO toDoDb.accounts (email, password) VALUES ('" + email + ", '" + password + "');";
    dbConnection.query(sqlCommand, function(error, result) {
        if (error) throw error;
        console.log("Added new user to the accounts table")
    });
}

function dbPromise(dbConnection, sql) {
    return new Promise((resolve, reject) => {
        dbConnection.query(sql, function(error, result, tableInfo) {
            if (error) throw error;
            let unparsedResult = JSON.stringify(result[0].password);
            resolve(unparsedResult);
        });
    });
}

async function runQuery(dbConnection, sql) {
    let result = await dbPromise(dbConnection, sql);
    let unparsedResult = result;
    let parsedResult = "";

    for (i = 0; i < unparsedResult.length; i++) {
        if (result[i] != '"') {
            parsedResult += unparsedResult[i];
        }
    }
    return parsedResult;
}

async function retrieveAccount(email, dbConnection) {
    let sqlCommand = "SELECT password FROM toDoDb.accounts WHERE email = '" + email + "';";

    return runQuery(dbConnection, sqlCommand);
}

function addToDo(user, toDoReminder, dbConnection) {
    // add the reminder to the database
    let sqlCommand = "INSERT INTO toDoDb.todos (email, reminder) VALUES ('" + user + "', '" + toDoReminder + "');";
    dbConnection.query(sqlCommand, function(error, result) {
        if (error) throw error;
        console.log("Added reminder to the database");
    });
}

function retrieveToDoReminders(user, dbConnection) {
    let userReminders = [];
    // get the user-specific reminders from the database
    let sqlCommand = "SELECT reminder FROM toDoDb.todos WHERE email = '" + user + "';";
    dbConnection.query(sqlCommand, function(error, result, tableInfo) {
        if (error) throw error;
            userReminders = result;
            console.log("Successfully retrieved the user's reminders");
    }); 

    // return the array containing the reminders stored in the database
    return userReminders;
}

module.exports = {initialSetup, addAccount, retrieveAccount, addToDo, retrieveToDoReminders};
