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

    mysqlConnection.query("SELECT expense.category, sum(expense.amount) as total from Pocket.expense where expense.userid = ? and expense.month = ? and expense.year = ? group by expense.category;",
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