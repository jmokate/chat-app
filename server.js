const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const dataAccess = require("./data_access");
const http = require("http");
const server = http.createServer(app);
const socketService = require("./services/socket-service");
const io = socketService.getIo(server);
require("dotenv").config();

dataAccess.connectToDb();

io.on("connection", socket => {
	socket.emit("new_message", "sockets connected");
});

app.use(express.static(path.join(__dirname, "client/build")));

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
	// serve static content
	app.use(express.static(path.join(__dirname, "client/build")));
}

//.ROUTES
const userRoutes = require("./routes/users-routes");
app.use("/api/users", userRoutes);

const messagesRoutes = require("./routes/messages-routes");
app.use("/api/messages", messagesRoutes);

const authRoutes = require("./routes/auth-routes");
app.use("/api", authRoutes);

app.get("/*", async (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

server.listen(port, () => console.log(`app with sockets listening at ${port}`));
