const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: String,
  dueDate: Date,
  email: String,
  completed: Boolean,
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
