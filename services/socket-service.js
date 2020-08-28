const socketIo = require("socket.io");

let io;

const getIo = server => {
	if (io) {
		return io;
	}
	io = socketIo(server);
	return io;
};

module.exports.getIo = getIo;
