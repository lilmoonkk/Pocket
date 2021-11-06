const express = require("express");
const mysqlConnection = require("./connection");
const UserRoutes = require("./routes/user")
const AddUser = require("./routes/AddUser")

var app = express();
app.use(express.json());

app.use("/user", UserRoutes);
app.use("/AddUser", AddUser);

app.listen(19002)