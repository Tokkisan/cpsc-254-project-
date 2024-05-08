# CPSC-254-project-
# To run the project
Follow these steps:
1. install Node.js
2. install MySQL Workbench
3. Setup MySQL Workbench
4. Edit server.js to include root as the username and your root password as the password (both have been left blank for security purposes)
5. Run server.js from the terminal
6. Navigate to localhost:3000 in browser of choice

# Installing Node.js
To install Node.js in Linux follow these steps:
1. Open the terminal on your machine
2. Run the command "sudo apt install npm" (Note: do not include the quotation marks)
3. To verify that Node.js has been installed, run the command "npm -v" without the quotation marks. The version number installed will be displayed.
4. Install the mysql module by using "npm install mysql" (without quotation marks)

# Installing MySQL Workbench
MySQL Installation (the steps for which are from this link: https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-install-linux-quick.html):
1. Download the MySQL APT repository from https://dev.mysql.com/downloads/repo/apt/
2. sudo dpkg -i /home/(your username)/Downloads mysql-apt-config_0.8.29-1_all.deb. This will bring up a prompt, hit OK.
3. sudo apt-get update
4. sudo apt-get install mysql-shell

# Setting up MySQL Workbench
Using MySQL (https://www.techtarget.com/searchdatacenter/tip/How-to-set-up-a-MySQL-database-in-Linux):
1. sudo apt-get install mysql-server -y
2. sudo systemctl enable --now mysql (this starts and enables the server)
3. sudo mysql_secure_installation. Several options will pop up, we answered them with the following parameters:
   Yes, no, yes, no, no, yes for all the options that show up.
4. sudo mysql -u root -p
5. CREATE DATABASE toDoDb;
   show databases; (These steps are for creating the table and seeing if it is there.)
6. CREATE USER 'dbadmin'@'localhost' (hit enter)
   -> IDENTIFIED BY 'PASSWORD'; (This will create a user dbadmin.)
7. quit (To exit mysql terminal)

# Running the server
To start the server follow these steps:
1. Open the terminal on your machine
2. Navigate to the directory that holds the project from the terminal (change the working directory)
3. Run the command "node server.js" (Note: do not include the quotation marks)
   The terminal will display a message if the server is running
