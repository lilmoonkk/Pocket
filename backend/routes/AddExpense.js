const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");


Router.post('/', (req, res) => {
    let {
        userid,
        desc,
        category,
        amount,
        day,
        month,
        year,
        time
    } = req.body;
 
    var data = {
        userid : userid,
        desc : desc,
        category : category,
        amount : amount,
        day : day,
        month : month,
        year : year,
        time : time,
    };
 
    var query = mysqlConnection.query("INSERT INTO expense (expense.userid, expense.desc, expense.category, expense.amount, expense.day, expense.month, expense.year, expense.time) VALUES (?,?,?,?,?,?,?,?) ", 
    [data.userid, data.desc, data.category, data.amount, data.day, data.month, data.year, data.time],
       function(err, rows) {
          if (err) {
             //If error
             res.status(400).json('Sorry!!Unable To Add');
          console.log("Error inserting : %s ", err);
       } else{
          //If success
          res.status(200).json('Expense Added Successfully!!');
       }
    });
});

module.exports = Router;