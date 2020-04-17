const express = require("express");
const app = express();
const path = require("path");
const exampleMessages = require("./api/Messages");
const port = process.env.PORT || 5000;
const dataAccess = require("./data_access");

dataAccess.connectToDb();

require("dotenv").config();

app.use(express.static(path.join(__dirname, "client/build")));

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET messages
app.get("/api/messages", async (req, res) => {
  const messages = await dataAccess.queryAllMessages();
  res.send(messages);
});

//POST messagesy
app.post("/api/messages", async (req, res) => {
  // const newMessage = {
  //   username: req.body.userName,
  //   text: req.body.text
  // };
  const newMessage = req.body.text;

  console.log(newMessage);
  dataAccess.createMessage(5, newMessage);
  // messages.push(newMember);
  // res.send(exampleMessages);
});

//GET all users
app.get("/api/users", async (req, res) => {
  const users = await dataAccess.queryUsers();

  // let users = messages.map(message => {
  //   return message.user;
  // });

  res.send(users);
});

//CREATE a user (CREATE user)
app.post("/api/users", async (req, res) => {
  const newUser = req.body.newUser;
  //console.log(newUser);
  const newUserId = await dataAccess.createUser(newUser);
  console.log(newUserId);
  // const newUser = {
  //   id: req.body.id,
  //   user: req.body.user
  // };
  // messages.push(newUser);
  // res.send(exampleMessages);

  res.status(201).send({ newUserId });
});

//GET single user
app.get("/api/users/:id", async (req, res) => {
  const userMatch = await dataAccess.queryUserById();
  // const userMatch = exampleMessages.filter(
  //   message => message.id === parseInt(req.params.id)
  // );
  res.send(userMatch);
});

app.get("/*", async (req, res) => {
  //res.send("hiya");
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`app listening at ${port}`));
