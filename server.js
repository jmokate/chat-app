const express = require("express");
const app = express();
const path = require("path");
const messages = require("./api/Messages");
const port = process.env.PORT || 5000;

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
    user: req.body.user,
    message: req.body.message
  };
  messages.push(newMember);
  res.send(messages);
});

//GET all users
app.get("/api/users", (req, res) => {});

//POST a user (CREATE user)
app.post("/api/users", (req, res) => {});

//GET single user
app.get("/api/users/:id", (req, res) => {});

app.get("/*", (req, res) => {
  res.send("hiya");
  res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

app.listen(port, () => console.log(`app listening at ${port}`));
