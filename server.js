const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

const dataAccess = require("./data_access");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

dataAccess.connectToDb();

require("dotenv").config();

io.on("connection", socket => {
  console.log("client is connected");
  socket.on("disconnect", () => {
    console.log("client has disconnected");
  });
});

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
  const password = req.body.password;
  console.log(newUser + " " + password);
  const newUserId = await dataAccess.createUser(newUser, password);
  console.log("node log " + newUserId);

  !newUserId
    ? res.status(401).json({ message: "This user already exists" })
    : res.status(201).send({ newUserId });
});

//LOGIN single user
app.post("/api/login", async (req, res) => {
  const loginName = req.body.userName;
  const password = req.body.password;
  console.log(loginName);
  const userMatch = await dataAccess.loginUser(loginName, password);
  // const userMatch = exampleMessages.filter(
  //   message => message.id === parseInt(req.params.id)
  // );
  !userMatch
    ? res.status(401).json({
        message: "sorry, incorrect username or password"
      })
    : console.log(userMatch);
  res.status(201).send({ userMatch });
});

app.get("/*", async (req, res) => {
  //res.send("hiya");
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

server.listen(port, () => console.log(`app with sockets listening at ${port}`));
