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
  console.log(req.body);
  const newMessageUserId = req.body.id;
  const newMessageText = req.body.text;

  dataAccess.createMessage(newMessageUserId, newMessageText);
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
  const newUser = req.body.userName;
  console.log(newUser);
  const newUserId = await dataAccess.createUser(newUser);
  console.log("node log" + newUserId);

  !newUserId
    ? res.status(401).json({ message: "This user already exists" })
    : res.status(201).send({ newUserId });
});

//LOGIN single user
app.post("/api/login", async (req, res) => {
  const loginName = req.body.userName;
  console.log(loginName);
  const userMatch = await dataAccess.queryUserById(loginName);
  // const userMatch = exampleMessages.filter(
  //   message => message.id === parseInt(req.params.id)
  // );
  !userMatch
    ? res.status(401).json({
        message:
          "sorry, this username does not exist. Please register an account"
      })
    : console.log(userMatch);
  res.status(201).send({ userMatch });
});

app.get("/*", async (req, res) => {
  //res.send("hiya");
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`app listening at ${port}`));
