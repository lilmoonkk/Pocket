const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.get("/", (req, res)=>{
    let {
        userid,
        date
    } = req.query;
 
    var data = {
        userid : userid,
        date: date
    };

    mysqlConnection.query("SELECT * from Pocket.income where userid = ? and income.date = ?; SELECT sum(amount) as sum from Pocket.income where userid = ? and income.date = ?;",
    [data.userid, data.date, data.userid, data.date], (err, rows, fields)=>{
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })

    
})

module.exports = Router;