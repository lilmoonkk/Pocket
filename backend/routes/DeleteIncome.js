const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.get("/", (req, res)=>{
    let {
        id
    } = req.query;
 
    var data = {
        id : id
    };

    mysqlConnection.query("SELECT * from Pocket.income where id = ?",
    [data.id], (err, rows, fields)=>{
        if(!err)
        {
            res.status(400).json('Sorry!!Unable To Delete');
        }
        else
        {
            res.status(200).json('Item Deleted Successfully!!');
        }
    })

    
})

module.exports = Router;