const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const db = require("../models");
const User = db.user;
const { Expense, RecurringExpense } = db.expense;

router.post("/new", (req, res) => {
  const expense = new Expense({
    email: req.body.email,
    note: req.body.note,
    amount: req.body.amount,
    date: req.body.date,
    category: req.body.category,
    bookmark: false,
  });
  expense
    .save()
    .then(res.send({ message: "Expense Added" }))
    .catch((err) => res.send(err));
});

router.post("/newRecurring", (req, res) => {
  const recurExpense = new RecurringExpense({
    email: req.body.email,
    note: req.body.note,
    amount: req.body.amount,
    repeat: req.body.repeat,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    category: req.body.category,
  });
  recurExpense.save().then(res.send({ message: "Recurring Expense Added" }));
});

router.get("/recurAll/:email", (req, res) => {
  RecurringExpense.find({ email: req.params.email })
    .then((res) => {
      var recurExpenses = res;
      recurExpenses.sort(function (a, b) {
        return new Date(b.endDate) - new Date(a.endDate);
      });
      return recurExpenses;
    })
    .then((data) => res.json(data));
});

router.post("/categoryChart/", (req, res) => {
  Expense.find({ email: req.body.email }).then((exp) => {
    var data = {
      Food: 0,
      Device: 0,
      Clothing: 0,
      Education: 0,
      Household: 0,
      Sports: 0,
      Other: 0,
    };
    const start = new Date(req.body.startDate);
    const end = new Date(req.body.endDate);
    exp.forEach((e) => {
      if (e.date <= end && e.date >= start) {
        if (e.category === "Food") data.Food += e.amount;
        else if (e.category === "Device") data.Device += e.amount;
        else if (e.category === "Clothing") data.Clothing += e.amount;
        else if (e.category === "Education") data.Education += e.amount;
        else if (e.category === "Household") data.Household += e.amount;
        else if (e.category === "Sports") data.Sports += e.amount;
        else if (e.category === "Other") data.Other += e.amount;
      }
    });
    res.json(data);
  });
});

router.get("/yearChart/:email/:year", (req, res) => {
  Expense.find({ email: req.params.email }).then((exp) => {
    var data = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };
    var curr = new Date(req.params.year).getFullYear();
    exp.forEach((e) => {
      if (e.date.getFullYear() === curr) {
        if (e.date.getMonth() === 0) data.Jan += e.amount;
        else if (e.date.getMonth() === 1) data.Feb += e.amount;
        else if (e.date.getMonth() === 2) data.Mar += e.amount;
        else if (e.date.getMonth() === 3) data.Apr += e.amount;
        else if (e.date.getMonth() === 4) data.May += e.amount;
        else if (e.date.getMonth() === 5) data.Jun += e.amount;
        else if (e.date.getMonth() === 6) data.Jul += e.amount;
        else if (e.date.getMonth() === 7) data.Aug += e.amount;
        else if (e.date.getMonth() === 8) data.Sep += e.amount;
        else if (e.date.getMonth() === 9) data.Oct += e.amount;
        else if (e.date.getMonth() === 10) data.Nov += e.amount;
        else if (e.date.getMonth() === 11) data.Dec += e.amount;
      }
    });
    res.json(data);
  });
});

router.get("/allWithRecur/:email/", (req, res) => {
  Expense.find({ email: req.params.email }).then((exp) => {
    var expenses = exp;
    RecurringExpense.find({ email: req.params.email })
      .then((res) => {
        var recurExpenses = res;
        recurExpenses.map((exp) => {
          if (exp.repeat === "Daily") {
          }
        });
        expenses.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        return expenses;
      })
      .then((data) => res.json(data));
  });
});

router.get("/all/:email/", (req, res) => {
  Expense.find({ email: req.params.email }).then((exp) => {
    var expenses = exp;
    expenses.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    res.json(expenses);
  });
});

router.get("/budget/:email/", (req, res) => {
  User.find({ email: req.params.email }).then((user) => {
    budget = user[0].budget ? user[0].budget : null;
    Expense.find({ email: req.params.email }).then((exp) => {
      var expenses = exp;
      var totExp = 0;
      expenses.forEach((exp) => {
        if (
          exp.date.getMonth() == new Date().getMonth() &&
          exp.date.getFullYear() == new Date().getFullYear()
        )
          totExp += exp.amount;
      });
      res.json({ budget: budget, totalExpense: totExp });
    });
  });
});

router.post("/addBudget/", async (req, res) => {
  await User.findOneAndUpdate(
    { email: req.body.email },
    { $set: { budget: req.body.budget } },
    { new: true }
  ).then(() => res.json({ message: "Budget Updated" }));
});

router.delete("/delete/:id/:email", (req, res) => {
  Expense.deleteOne({ _id: req.params.id }, (res) => {});
  Expense.find({ email: req.params.email, _id: { $ne: req.params.id } })
    .then((res) => {
      var expenses = res;
      expenses.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      return expenses;
    })
    .then((data) => res.json(data));
});

router.delete("/recurdelete/:id/:email", (req, res) => {
  RecurringExpense.deleteOne({ _id: req.params.id }, (res) => {});
  RecurringExpense.find({
    email: req.params.email,
    _id: { $ne: req.params.id },
  })
    .then((res) => {
      var expenses = res;
      expenses.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      return expenses;
    })
    .then((data) => res.json(data));
});

router.get("/bookmark/:id/:email", (req, res) => {
  Expense.findOneAndUpdate({ _id: req.params.id }, [
    { $set: { bookmark: { $not: "$bookmark" } } },
  ]).then(() => {
    var expenses = [];
    Expense.find({ email: req.params.email })
      .then((data) => {
        expenses = data;
        expenses.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        expenses.forEach((element) => {
          if (element._id === req.params.id) {
            element.bookmark = !element.bookmark;
          }
        });
        return expenses;
      })
      .then((data) => res.json(data));
  });
});

module.exports = router;
