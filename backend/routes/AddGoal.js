const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");


Router.post('/', (req, res) => {
    let {
        userid,
        desc,
        day,
        month,
        year,
        target,
        allocated
    } = req.body;
 
    var data = {
        userid : userid,
        desc : desc,
        day : day,
        month : month,
        year : year,
        target : target,
        allocated : allocated
    };
 
    mysqlConnection.query("INSERT INTO goal (goal.userid, goal.desc, goal.day, goal.month, goal.year, goal.target, goal.allocated) VALUES (?,?,?,?,?,?,?) ", 
    [data.userid, data.desc, data.day, data.month, data.year, data.target, data.allocated],
       function(err, rows) {
          if (err) {
             //If error
             res.status(400).json('Sorry!!Unable To Add');
          console.log("Error inserting : %s ", err);
       } else{
          //If success
          res.status(200).json(' Goal Added Successfully!!');
       }
    });
});

module.exports = Router;