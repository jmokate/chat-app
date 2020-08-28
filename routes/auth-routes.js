const express = require("express");
const router = express.Router();
const dataAccess = require("../data_access");
const socketService = require("../services/socket-service");
const io = socketService.getIo();

//LOGIN single user
router.post("/login", async (req, res) => {
	const loginName = req.body.userName;
	const password = req.body.password;
	let userMatch = await dataAccess.loginUser(loginName, password);

	!userMatch.isSuccessful
		? res.status(401).json({
				message: userMatch.errorMessage,
		  })
		: (userMatch = userMatch.user);

	res.status(201).send({ userMatch });

	io.emit("user_online", JSON.stringify(userMatch));
});

router.post("/logout", async (req, res) => {
	const id = req.body.id;
	let logOutName = req.body.userName;

	const userMatch = await dataAccess.logOutUser(logOutName);

	!userMatch
		? res.status(401).json({
				message: "there was an issue logging out",
		  })
		: res.status(201).send({ userMatch });

	io.emit("user_disconnect", JSON.stringify(id));
});

router.put("/logout/:id", async (req, res) => {
	const id = req.params.id;

	await dataAccess.putLogoutUser(id);

	io.emit("user_disconnect", JSON.stringify(id));
});

module.exports = router;
