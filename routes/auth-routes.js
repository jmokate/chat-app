const express = require("express");
const router = express.Router();
const authAccess = require("../database/authAccess");
const socketService = require("../services/socket-service");
const io = socketService.getIo();

router.post("/login", async (req, res) => {
	const loginName = req.body.userName;
	const password = req.body.password;
	let userMatch = await authAccess.loginUser(loginName, password);

	if (!userMatch.isSuccessful) {
		res.status(401).json({
			message: userMatch.errorMessage,
		});
	} else if (userMatch.isSuccessful) {
		userMatch = userMatch.user;

		res.status(201).send({ userMatch });
	}

	io.emit("user_online", JSON.stringify(userMatch));
});

router.post("/logout", async (req, res) => {
	const id = req.body.id;
	let logOutName = req.body.userName;

	const userMatch = await authAccess.logOutUser(logOutName);

	if (!userMatch) {
		res.status(401).json({
			message: "there was an issue logging out",
		});
	} else {
		res.status(201).send({ userMatch });
	}

	io.emit("user_disconnect", JSON.stringify(id));
});

router.put("/logout/:id", async (req, res) => {
	const id = req.params.id;

	await authAccess.putLogoutUser(id);

	io.emit("user_disconnect", JSON.stringify(id));
});

module.exports = router;
