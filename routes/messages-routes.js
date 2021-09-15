const express = require("express");
const router = express.Router();
const messagesAccess = require("../database/messagesAccess");
const socketService = require("../services/socket-service");
const io = socketService.getIo();

// GET messages
router.get("/", async (req, res) => {
	const messages = await messagesAccess.queryAllMessages();
	res.send(messages);
});

//POST messagesy
router.post("/", async (req, res) => {
	let newMessage = {
		id: req.body.id,
		username: req.body.username,
		text: req.body.text,
	};
	console.log(newMessage)

	const newMessageUserId = req.body.id;
	const newMessageText = req.body.text;

	let returnedMessage = await messagesAccess.createMessage(
		newMessageUserId,
		newMessageText
	);

	returnedMessage.username = newMessage.username;

	io.emit("chat_message", JSON.stringify(returnedMessage));
	console.log(returnedMessage)
});

module.exports = router;
