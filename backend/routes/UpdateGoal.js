const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");


Router.post('/', (req, res) => {
    let {
        id,
        amount
    } = req.body;
 
    var data = {
        id : id,
        amount : amount
    };
   
    mysqlConnection.query("UPDATE goal SET goal.allocated = ((select * from (select goal.allocated from goal where goal.id = ?)ori)+?)  WHERE goal.id = ?;", 
    [data.id, data.amount, data.id],
       function(err, rows) {
          if (err) {
             //If error
             res.status(400).json('Sorry!!Unable To Update');
          console.log("Error updating : %s ", err);
       } else{
          //If success
          res.status(200).json('Goal Updated Successfully!!');
       }
    });
});

module.exports = Router;