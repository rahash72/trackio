const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { OAuth2Client } = require("google-auth-library");
const User = require("./models/User");
const expenseRouter = require("./routes/Expenses");
const todoRouter = require("./routes/Todo");
require("dotenv").config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

app.post("/api/google-login", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();

  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    const budget = null;
    const newUser = new User({
      name,
      email,
      picture,
      budget,
    });
    await newUser.save();
  }

  res.status(201);
  res.json({ name, email, picture });
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/expenses", expenseRouter);
app.use("/todo", todoRouter);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
