const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host : "34.122.104.222",
    user : "root",
    password : "cat304",
    database : "Pocket",
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