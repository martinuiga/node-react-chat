const _ = require('lodash');

class UserController {
	getUserWithSocketId(usersList, socketId) {
		return _.find(usersList, { socketId });
	}

	userDisconnected(users, socket) {
		_.forEach(users, (user) => {
			if (user.socketId !== socket.id) return;
			user.connected = false;
			return false;
		});
	}


	userReconnected(users, socket, user) {
		let found = false;
		_.forEach(users, (user) => {
			if (user.id !== socket.id) return;
			user.socketId = socket.id;
			user.connected = true;
			console.log('user reconnect');
			found = true;
			return false;
		});
	}

	// validSocketId(users, socket) {
	// 	return !!_.find(users, { socketid: socket.id });
	// }
}

module.exports = new UserController();
