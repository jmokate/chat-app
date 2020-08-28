const express = require("./node_modules/express");
const router = express.Router();
const dataAccess = require("../data_access");
const socketService = require("../services/socket-service");
const io = socketService.getIo();

//GET all users
router.get("/", async (req, res) => {
	if (req.query.active === "true") {
		const users = await dataAccess.queryActiveUsers();
		res.send(users);
	} else {
		const users = await dataAccess.queryInactiveUsers();
		res.send(users);
	}
});

//CREATE a user
router.post("/", async (req, res) => {
	const newUserName = req.body.userName;
	const password = req.body.password;

	let newUser = await dataAccess.createUser(newUserName, password);

	!newUser
		? res.status(401).json({ message: "This user already exists" })
		: res.status(201).send({ newUser });
	io.emit("user_online", JSON.stringify(newUser));
});

module.exports = router;
