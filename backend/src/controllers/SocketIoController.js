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
		this.socket.on('action', (action) => {
			console.log(action.type);
			switch (action.type) {
				case socketActions.INITIALIZE:
					return this.actionInitialize(action);
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
				chatRooms: this.chatRooms,
				chatLog: util.chatLog
			}
		})
	}

	actionMessage(action) {
		console.log(action.data.nickname);
	}

	actionJoinRoom(action) {
		console.log(action);
		const groupId = action.data.groupId;

		if (groupId === undefined || groupId === null) return null; // TODO return error to client

		//not sure if this is a good idea to rewrite like that
		const userChatRooms = ChatRoomController.joinRoom(this.chatRooms, groupId);

	}
}

module.exports = SocketIoController;
