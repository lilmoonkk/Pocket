const express = require("express");
const mysqlConnection = require("./connection");
const UserRoutes = require("./routes/user")
const AddUser = require("./routes/AddUser")
const AddIncome = require("./routes/AddIncome")
const GetIncome = require("./routes/GetIncome")

var app = express();
app.use(express.json());

app.use("/user", UserRoutes);
app.use("/AddUser", AddUser);
app.use("/AddIncome", AddIncome);
app.use("/GetIncome", GetIncome);
app.listen(19002)