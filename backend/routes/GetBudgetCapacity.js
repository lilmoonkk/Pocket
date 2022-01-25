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
        year : year
    };

    mysqlConnection.query("SELECT budget.category, sum(expense.amount) as expense, budget.amount as budget, (sum(expense.amount)/budget.amount)percentage from Pocket.expense join Pocket.budget on expense.userid = budget.userid and expense.userid = ? and expense.category = budget.category group by expense.category;",
    [data.userid], (err, rows, fields)=>{
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