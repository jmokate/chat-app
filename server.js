const express = require("express");
const app = express();
const path = require("path");
const messages = require("./api/Messages");
const port = process.env.PORT || 5000;
const db = require("./db");

const database = db.connectToDb();

require("dotenv").config();

app.use(express.static(path.join(__dirname, "client/public")));

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET messages
app.get("/api/messages", (req, res) => {
  res.send(messages);
});

//POST messages
app.post("/api/messages", (req, res) => {
  const newMember = {
    id: req.body.id,
    user: req.body.user,
    message: req.body.message
  };
  messages.push(newMember);
  res.send(messages);
});

//GET all users
app.get("/api/users", (req, res) => {
  let users = messages.map(message => {
    return message.user;
  });
  res.send(users);
});

//POST a user (CREATE user)
app.post("/api/users", (req, res) => {
  const newUser = {
    id: req.body.id,
    user: req.body.user
  };
  messages.push(newUser);
  res.send(messages);
});

//GET single user
app.get("/api/users/:id", (req, res) => {
  const userMatch = messages.filter(
    message => message.id === parseInt(req.params.id)
  );
  res.send(userMatch);
});

app.get("/*", (req, res) => {
  res.send("hiya");
  res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

app.listen(port, () => console.log(`app listening at ${port}`));
