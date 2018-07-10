const _ = require('lodash');

const config = require('../config/config.js');
const socketActions = require('../constants/socketActions');
const util = require('../util/util');
const ChatRoomController = require('./ChatRoomController');

class SocketIoController {
	constructor(socket, chatRooms, chatLog, userCounter) {
		this.socket = socket;
		this.chatRooms = chatRooms;
		this.chatLog = chatLog;
		this.userCounter = userCounter;
	}

	handleEvents() {
		console.log('a user connected');
		this.actionInitialize();
		console.log(this.socket);
		this.socket.on('action', (action) => {
			console.log(action.type);
			switch (action.type) {
				case socketActions.MESSAGE:
					return this.actionMessage(action);
				case socketActions.JOIN_GROUP:
					return this.actionJoinRoom(action);
				default:
					return console.log('Unknown action ', action.type);
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
		console.log(action.data.nickname);
	}

	actionJoinRoom(action) {
		const groupId = action.data.groupId;

		if (!groupId) return null; // TODO return error to client

		//not sure if this is a good idea to rewrite like that
		const userChatRooms = ChatRoomController.joinGroup(this.chatRooms, groupId);

	}
}

module.exports = SocketIoController;
