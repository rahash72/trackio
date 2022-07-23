const mongoose = require("mongoose");
const { Expense, RecurringExpense } = require("./Expense");
const expenseSchema = Expense.schema;
const recurringExpenseSchema = RecurringExpense.schema;

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  picture: {
    type: String,
  },
  budget: Number,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
