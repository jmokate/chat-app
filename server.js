const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client/public")));

// GET messages
app.get("/api/messages", (req, res) => {
  messages = [
    { user: "You", message: "hi" },
    { user: "Them", message: "yo what up" }
  ];
  res.send(messages);
});

//POST messages
app.post("/api/messages", (req, res) => {});

//GET all users
app.get("/api/users", (req, res) => {});

//POST a user (CREATE user)
app.post("/api/users", (req, res) => {});

//GET single user
app.get("/api/users/id", (req, res) => {});

app.get("/*", (req, res) => {
  res.send("hiya");
  res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

app.listen(port, () => console.log(`app listening at ${port}`));
