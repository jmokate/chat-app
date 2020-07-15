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

  socket.emit("new_message", "sockets connected");
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
  let newMessage = {
    id: req.body.id,
    username: req.body.username,
    text: req.body.text
  };

  const newMessageUserId = req.body.id;
  const newMessageText = req.body.text;

  returnedMessage = await dataAccess.createMessage(
    newMessageUserId,
    newMessageText
  );

  returnedMessage.username = newMessage.username;

  console.log(returnedMessage);

  io.emit("chat_message", JSON.stringify(returnedMessage));
  console.log(returnedMessage);
});

//GET all users
app.get("/api/users", async (req, res) => {
  if (req.query.active === "true") {
    const users = await dataAccess.queryActiveUsers();
    res.send(users);
  } else {
    const users = await dataAccess.queryUsers();
    res.send(users);
  }
});

//CREATE a user
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
  let userMatch = await dataAccess.loginUser(loginName, password);
  console.log("the user match returns as ", userMatch);
  !userMatch.isSuccessful
    ? res.status(401).json({
        message: userMatch.errorMessage
      })
    : (userMatch = userMatch.user);
  console.log("filtered user match is this ", userMatch);
  res.status(201).send({ userMatch });
  io.emit("user_online", JSON.stringify(userMatch));
});

app.post("/api/logout", async (req, res) => {
  const id = req.body.id;
  let logOutName = req.body.userName;
  console.log("the req body info on user is ", id);
  const userMatch = await dataAccess.logOutUser(logOutName);

  !userMatch
    ? res.status(401).json({
        message: "there was an issue logging out"
      })
    : res.status(201).send({ userMatch });
  io.emit("user_disconnect", JSON.stringify(id));
});

app.put("/api/logout/:id", async (req, res) => {
  const id = req.params.id;

  putUserLogout = await dataAccess.putLogoutUser(id);

  io.emit("user_disconnect", JSON.stringify(id));
});

app.get("/*", async (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

server.listen(port, () => console.log(`app with sockets listening at ${port}`));
