const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");


Router.post('/', (req, res) => {
    let {
        userid,
        category,
        amount
    } = req.body;
 
    var data = {
        userid : userid,
        category : category,
        amount : amount
    };
   
    mysqlConnection.query("UPDATE budget SET budget.amount = ? WHERE budget.userid = ? and budget.category = ?;", 
    [data.amount, data.userid, data.category],
       function(err, rows) {
          if (err) {
             //If error
             res.status(400).json('Sorry!!Unable To Update');
          console.log("Error updating : %s ", err);
       } else{
          //If success
          res.status(200).json('Budget Updated Successfully!!');
       }
    });
});

module.exports = Router;