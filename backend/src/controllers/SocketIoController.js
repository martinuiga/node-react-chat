const config = require('../config/config.js');
const _ = require('lodash');
const socketActions = require('../constants/socketActions');
const util = require('../util/util');

class SocketIoController {
	constructor(socket) {
		this.socket = socket;
	}

	handleEvents() {
		console.log('a user connected');
		this.actionInitialize();
		this.socket.on('action', (action) => {
			console.log(action.type);
			switch (action.type) {
				case socketActions.MESSAGE:
					return this.actionMessage(action);
			}
		});
		this.socket.on('disconnect', () => {
			console.log("disconnected");
		});
	}

	actionInitialize() {
		this.socket.emit('action', {
			type: 'INITIALIZE_ROOMS',
			data: {
				chatRooms: util.chatRooms,
				chatLog: util.chatLog
			}
		})
	}

	actionMessage(action) {

	}

	actionJoinRoom(action) {

	}
}

module.exports = SocketIoController;
