const express = require("express");
const mysqlConnection = require("./connection");
const UserRoutes = require("./routes/user")
const AddUser = require("./routes/AddUser")
const AddIncome = require("./routes/AddIncome")
const GetIncome = require("./routes/GetIncome")
const DeleteIncome = require("./routes/DeleteIncome")
const AddExpense = require("./routes/AddExpense")
const GetExpense = require("./routes/GetExpense")
const DeleteExpense = require("./routes/DeleteExpense")

var app = express();
app.use(express.json());

app.use("/user", UserRoutes);
app.use("/AddUser", AddUser);
app.use("/AddIncome", AddIncome);
app.use("/GetIncome", GetIncome);
app.use("/DeleteIncome", DeleteIncome);
app.use("/AddExpense", AddExpense);
app.use("/GetExpense", GetExpense);
app.use("/DeleteExpense", DeleteExpense);

app.listen(19002)