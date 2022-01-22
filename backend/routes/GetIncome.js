const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.get("/", (req, res)=>{
    let {
        userid,
        day,
        month,
        year
    } = req.query;
 
    var data = {
        userid : userid,
        day : day,
        month : month,
        year : year,
    };

    mysqlConnection.query("SELECT * from Pocket.income where userid = ? and income.day = ? and income.month = ? and income.year = ? ; SELECT sum(amount) as sum from Pocket.income where userid = ? and income.day = ? and income.month = ? and income.year = ? ;",
    [data.userid, data.day, data.month, data.year, data.userid, data.day, data.month, data.year], (err, rows, fields)=>{
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