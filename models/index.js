const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User");
db.expense = require("./Expense");
db.todo = require("./Todo");

module.exports = db;
