const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  email: String,
  note: String,
  amount: Number,
  date: Date,
  category: String,
  bookmark: Boolean,
});

const recurringExpenseSchema = mongoose.Schema({
  email: String,
  note: String,
  amount: Number,
  repeat: String,
  startDate: Date,
  endDate: Date,
  category: String,
});

const Expense = mongoose.model("expense", expenseSchema);
const RecurringExpense = mongoose.model(
  "recurringExpense",
  recurringExpenseSchema
);

module.exports = { Expense, RecurringExpense };
