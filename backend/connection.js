const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "cat304",
    database : "pocket",
    multipleStatements : true
});

mysqlConnection.connect((err)=>{
    if(!err)
    {
        console.log("Connected");
    }
    else{
        console.log("Connection failed");
    }
});

module.exports = mysqlConnection;