const express = require("express");
const router = express.Router();
const dataAccess = require("../data_access");
const socketService = require("../services/socket-service");
const io = socketService.getIo();

// GET messages
router.get("/", async (req, res) => {
	const messages = await dataAccess.queryAllMessages();
	res.send(messages);
});

//POST messagesy
router.post("/", async (req, res) => {
	let newMessage = {
		id: req.body.id,
		username: req.body.username,
		text: req.body.text,
	};

	const newMessageUserId = req.body.id;
	const newMessageText = req.body.text;

	let returnedMessage = await dataAccess.createMessage(
		newMessageUserId,
		newMessageText
	);

	returnedMessage.username = newMessage.username;

	io.emit("chat_message", JSON.stringify(returnedMessage));
});

module.exports = router;
