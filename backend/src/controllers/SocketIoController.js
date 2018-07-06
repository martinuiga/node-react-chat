const config = require('../../config/config.js');
const _ = require('lodash');
const socketActions = require('../../constants/socketActions');

class SocketIoController {
	constructor(socket) {
		this.socket = socket;
	}

	handleEvents() {
		console.log('a user connected');
		this.socket.on('action', (action) => {
			console.log(action.type);
			switch (action.type) {
				case socketActions.INITIALIZE:
					return this.actionInitialize(action);
				case socketActions.SEND_TO_SERVER_EXAMPLE:
					return this.actionExample(action);
			}
		});
		this.socket.on('disconnect', () => {
			console.log("disconnected");
		});
	}

	actionInitialize(action) {
		setTimeout(() => {
			this.socket.emit('action', {
				type: 'EXAMPLE_FROM_SERVER',
				data: {message: 'Message from server 5 seconds after connection!'}
			})
		}, 5000);
	}

	actionExample(action) {
		console.log(action);
	}
}

module.exports = SocketIoController;
