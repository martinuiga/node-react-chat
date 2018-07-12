const _ = require('lodash');

const socketActions = require('../constants/socketActions');
const ChatRoomController = require('./ChatRoomController');

class SocketIoController {
	constructor(socket, chatRooms, chatLog, users) {
		this.socket = socket;
		this.chatRooms = chatRooms;
		this.chatLog = chatLog;
		this.users = users;
	}

	handleEvents() {
		this.socket.on('action', (action) => {
			console.log(action);
			switch (action.type) {
				case socketActions.INITIALIZE:
					return this.actionInitialize(action, this.socket.id);
				case socketActions.MESSAGE:
					return this.actionMessage(action);
				case socketActions.JOIN_GROUP:
					return this.actionJoinRoom(action);
				case socketActions.RECONNECT:
					return this.actionReconnect(action);
				default:
					return console.log('Unknown action ', action.type);
			}
		});
		this.socket.on('disconnect', () => {
			console.log("disconnected");
			_.forEach(this.users, (user) => {
				if (user.socket !== this.socket.id) return;
				user.connected = false;
				return false;
			});
		});
	}

	actionInitialize(action, id) {
		const nickname = action.data.nickname;

		if (!action.data.nickname) return null;
		const users = this.users;
		const userId = users.length;
		const activeSameUser = _.find(users, { connected: true, nickname: nickname });

		if (activeSameUser) {
			this.socket.emit('action', {
				type: 'NEW_NAME_REQUIRED',
				data: {
					nickname
				}
			});
			return null;
		}
		users.push({
			id: userId,
			nickname,
			socket: id,
			connected: true
		});

		this.socket.emit('action', {
			type: 'INITIALIZE_ROOMS',
			data: {
				id: userId,
				chatRooms: this.chatRooms,
				chatLog: this.chatLog
			}
		})
	}

	actionReconnect(action) {
		const id = action.data.id;
		if (!action.data.nickname || !id) return null;

		_.forEach(this.users, (user) => {
			if (user.id !== id) return;
			user.socket = this.socket.id;
			user.connected = true;
			return false;
		});
	}

	actionMessage(action) {
		console.log(action.data.nickname);
	}

	actionJoinRoom(action) {
		const groupId = action.data.groupId;

		if (groupId === undefined || groupId === null) return null; // TODO return error to client

		//not sure if this is a good idea to rewrite like that
		const userChatRooms = ChatRoomController.joinRoom(this.chatRooms, groupId);
	}

}

module.exports = SocketIoController;
