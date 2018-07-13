const _ = require('lodash');

const socketActions = require('../constants/socketActions');
const ChatRoomController = require('./ChatRoomController');
const UserController = require('./UserController');

class SocketIoController {
	constructor(socket, io, chatRooms, chatLog, users) {
		this.socket = socket;
		this.io = io;
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
					return this.actionInitialize(action, this.socket.id);
				default:
					return console.log('Unknown action ', action.type);
			}
		});

		this.socket.on('disconnect', () => {
			console.log("disconnected");
			UserController.userDisconnected(this.users, this.socket);
			this.updateRoomsAll(this.chatRooms, this.users, this.io);
		});
		this.socket.on('reconnect', () => {
			console.log('reconnect');
			this.actionInitialize(action, this.socket.id);
		})
	}

	actionInitialize(action, id) {
		console.log('initialize');
		const nickname = action.data.nickname;

		if (!action.data.nickname) return null;
		const users = this.users;
		const userId = users.length;
		const activeSameUser = _.find(users, { nickname: nickname });

		if (activeSameUser || !nickname.length) {
			if (activeSameUser.connected) {
				this.socket.emit('action', {
					type: 'NEW_NAME_REQUIRED',
					data: {
						nickname
					}
				});
				return null;
			} else {
				UserController.userReconnected(this.users, this.socket, activeSameUser);
			}
		}

		const currentUser = {
			id: userId,
			nickname,
			socketId: id,
			connected: true
		};
		users.unshift({
			...currentUser
		});

		ChatRoomController.joinRoom(this.chatRooms, 0, currentUser);
		// ChatRoomController.updateRooms(this.chatRooms, this.users);

		this.socket.emit('action', {
			type: 'INITIALIZE_ROOMS',
			data: {
				id: userId,
				chatRooms: this.chatRooms,
				chatLog: this.chatLog
			}
		});

		this.updateRoomsOthers(this.chatRooms, this.users, this.socket);
	}

	actionMessage(action) {
		console.log(action.data.nickname);
	}

	actionJoinRoom(action) {
		const roomId = action.data.roomId;

		if (roomId === undefined || roomId === null) return null; // TODO return error to client
		const user = UserController.getUserWithSocketId(this.users, this.socket.id);

		ChatRoomController.joinRoom(this.chatRooms, roomId, user);
		this.updateRoomsAll(this.chatRooms, this.users, this.io);
	}

	updateRoomsAll(chatRooms, users, io) {
		ChatRoomController.updateRooms(chatRooms, users);

		io.sockets.emit('action', { //broadcast to everyone
			type: 'ROOM_UPDATE',
			data: {
				chatRooms: chatRooms
			}
		});
	}

	updateRoomsOthers(chatRooms, users, socket) {
		ChatRoomController.updateRooms(chatRooms, users);

		socket.broadcast.emit('action', {
			type: 'ROOM_UPDATE',
			data: {
				chatRooms: chatRooms
			}
		});
	}

}

module.exports = SocketIoController;
