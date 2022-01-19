const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.post("/", (req, res)=>{
    let {
        id
    } = req.body;
    
    var data = {
        id : id
    };
    
    mysqlConnection.query("DELETE from Pocket.goal where id = ?",
    [data.id], (err, rows)=>{
        if(err)
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