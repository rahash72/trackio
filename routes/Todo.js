const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const db = require("../models");
const User = db.user;
const Todo = db.todo;

router.post("/new", (req, res) => {
  const todo = new Todo({
    email: req.body.email,
    title: req.body.title,
    dueDate: req.body.dueDate,
    completed: false,
  });
  todo.save().then(res.send({ message: "Task Added" }));
});

router.get("/all/:email/", (req, res) => {
  Todo.find({ email: req.params.email }).then((todo) => {
    var todos = todo;
    todos.sort(function (a, b) {
      return new Date(b.dueDate) - new Date(a.dueDate);
    });
    res.json(todos);
  });
});

router.delete("/delete/:id/:email", (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (res) => {});
  Todo.find({ email: req.params.email, _id: { $ne: req.params.id } })
    .then((res) => {
      var todos = res;
      todos.sort(function (a, b) {
        return new Date(b.dueDate) - new Date(a.dueDate);
      });
      return todos;
    })
    .then((data) => res.json(data));
});

router.get("/complete/:id/:email", (req, res) => {
  Todo.findOneAndUpdate({ _id: req.params.id }, [
    { $set: { completed: { $not: "$completed" } } },
  ]).then(() => {
    var todos = [];
    Todo.find({ email: req.params.email })
      .then((data) => {
        todos = data;
        todos.sort(function (a, b) {
          return new Date(b.dueDate) - new Date(a.dueDate);
        });
        todos.forEach((element) => {
          if (element._id === req.params.id) {
            element.completed = !element.completed;
          }
        });
        return todos;
      })
      .then((data) => res.json(data));
  });
});

router.get("/yearChart/:email/:year", (req, res) => {
  Todo.find({ email: req.params.email }).then((exp) => {
    var totalTasks = {
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
    var completedTasks = {
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
      if (e.dueDate.getFullYear() === curr) {
        if (e.dueDate.getMonth() === 0) {
          totalTasks.Jan += 1;
          if (e.completed) completedTasks.Jan += 1;
        } else if (e.dueDate.getMonth() === 1) {
          totalTasks.Feb += 1;
          if (e.completed) completedTasks.Feb += 1;
        } else if (e.dueDate.getMonth() === 2) {
          totalTasks.Mar += 1;
          if (e.completed) completedTasks.Mar += 1;
        } else if (e.dueDate.getMonth() === 3) {
          totalTasks.Apr += 1;
          if (e.completed) completedTasks.Apr += 1;
        } else if (e.dueDate.getMonth() === 4) {
          totalTasks.May += 1;
          if (e.completed) completedTasks.May += 1;
        } else if (e.dueDate.getMonth() === 5) {
          totalTasks.Jun += 1;
          if (e.completed) completedTasks.Jun += 1;
        } else if (e.dueDate.getMonth() === 6) {
          totalTasks.Jul += 1;
          if (e.completed) completedTasks.Jul += 1;
        } else if (e.dueDate.getMonth() === 7) {
          totalTasks.Aug += 1;
          if (e.completed) completedTasks.Aug += 1;
        } else if (e.dueDate.getMonth() === 8) {
          totalTasks.Sep += 1;
          if (e.completed) completedTasks.Sep += 1;
        } else if (e.dueDate.getMonth() === 9) {
          totalTasks.Oct += 1;
          if (e.completed) completedTasks.Oct += 1;
        } else if (e.dueDate.getMonth() === 10) {
          totalTasks.Nov += 1;
          if (e.completed) completedTasks.Nov += 1;
        } else if (e.dueDate.getMonth() === 11) {
          totalTasks.Dec += 1;
          if (e.completed) completedTasks.Dec += 1;
        }
      }
    });
    res.json({ completedTasks, totalTasks });
  });
});

module.exports = router;
