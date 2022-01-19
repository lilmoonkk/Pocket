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
const GetBudget = require("./routes/GetBudget")
const UpdateBudget = require("./routes/UpdateBudget")
const AddGoal = require("./routes/AddGoal")
const GetGoal = require("./routes/GetGoal")
const DeleteGoal = require("./routes/DeleteGoal")

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
app.use("/GetBudget", GetBudget);
app.use("/UpdateBudget", UpdateBudget);
app.use("/AddGoal", AddGoal);
app.use("/GetGoal", GetGoal);
app.use("/DeleteGoal", DeleteGoal);

app.listen(19002)