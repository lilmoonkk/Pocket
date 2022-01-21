const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.get("/", (req, res)=>{
    let {
        userid,
        month,
        year
    } = req.query;
 
    var data = {
        userid : userid,
        month : month,
        year : year,
    };

    mysqlConnection.query("SELECT sum(amount) as sum from Pocket.income where userid = ? and income.month = ? and income.year = ? ;",
    [data.userid, data.month, data.year], (err, rows, fields)=>{
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