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

    mysqlConnection.query("SELECT * from Pocket.user where user.userid = ?;",
    [data.userid, data.userid], (err, rows, fields)=>{
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