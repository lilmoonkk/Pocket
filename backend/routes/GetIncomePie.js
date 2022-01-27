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

    mysqlConnection.query("SELECT income.desc, sum(income.amount) as total from Pocket.income where income.userid = ? and income.month = ? and income.year = ? group by income.desc;",
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