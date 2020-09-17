const express = require("express");
const router = express.Router();
const usersAccess = require("../database/usersAccess");
const socketService = require("../services/socket-service");
const io = socketService.getIo();

//GET all users
router.get("/", async (req, res) => {
	if (req.query.active === "true") {
		const users = await usersAccess.queryActiveUsers();
		res.send(users);
	} else {
		const users = await usersAccess.queryInactiveUsers();
		res.send(users);
	}
});

//CREATE a user
router.post("/", async (req, res) => {
	const newUserName = req.body.userName;
	const password = req.body.password;

	let newUser = await usersAccess.createUser(newUserName, password);

	if (!newUser) {
		res.status(401).json({ message: "This user already exists" });
	} else {
		res.status(201).send({ newUser });
	}

	io.emit("user_online", JSON.stringify(newUser));
});

module.exports = router;
