const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");


Router.post('/', (req, res) => {
    let {
        userid,
        username,
        identitycardno,
        email,
        phoneno,
        fixedspending
    } = req.body;
 
    var data = {
        userid : userid,
        username : username,
        identitycardno : identitycardno,
        email : email,
        phoneno : phoneno,
        fixedspending: fixedspending
    };
 
    var query = mysqlConnection.query("INSERT INTO user VALUES (?,?,?,?,?,?) ", 
    [data.userid, data.username, data.identitycardno, data.email, data.phoneno, data.fixedspending],
       function(err, rows) {
          if (err) {
             //If error
             res.status(400).json('Sorry!!Unable To Add');
          console.log("Error inserting : %s ", err);
       } else{
          //If success
          res.status(200).json('User Added Successfully!!');
       }
    });
});

module.exports = Router;