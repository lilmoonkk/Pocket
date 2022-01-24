const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");


Router.post('/', (req, res) => {
    let {
        userid,
        username,
        email,
        phoneno
    } = req.body;
 
    var data = {
        userid : userid,
        username : username,
        email : email,
        phoneno : phoneno
    };
   
    mysqlConnection.query("UPDATE user SET user.username = ?, user.email = ?, user.phoneno = ? WHERE user.userid = ?;", 
    [data.username, data.email, data.phoneno, data.userid],
       function(err, rows) {
          if (err) {
             //If error
             res.status(400).json('Sorry!!Unable To Update');
          console.log("Error updating : %s ", err);
       } else{
          //If success
          res.status(200).json('Profile Updated Successfully!!');
       }
    });
});

module.exports = Router;