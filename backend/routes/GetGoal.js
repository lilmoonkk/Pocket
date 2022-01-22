const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.get("/", (req, res)=>{
    let {
        userid
    } = req.query;
 
    var data = {
        userid : userid
    };

    mysqlConnection.query("SELECT *, (goal.allocated/goal.target)percentage from Pocket.goal where goal.userid = ? and goal.desc != ?; SELECT *, (goal.allocated/goal.target)percentage from Pocket.goal where goal.userid = ? and goal.desc = ?",
    [data.userid, 'Emergency Fund', data.userid, 'Emergency Fund'], (err, rows, fields)=>{
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