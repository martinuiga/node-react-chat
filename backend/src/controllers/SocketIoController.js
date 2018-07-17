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
				case socketActions.SEND_MESSAGE:
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
		const nickname = action.data.nickname;

		if (!action.data.nickname) return this.sendError('Nickname missing', 'Error');
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
				chatLog: this.getChatLogForRoom(this.chatLog, 0),
				users: users
			}
		});
		console.log(this.chatLog);

		this.updateRoomsOthers(this.chatRooms, this.users, this.socket);
		const roomName = ChatRoomController.getRoomNameWithId(this.chatRooms, 0).name;

		this.socket.join(roomName);
		this.updateChatLogsAll(roomName, this.io, this.getChatLogForRoom(this.chatLog, 0));
	}

	getChatLogForRoom(chatLog, roomId) {
		return (_.find(chatLog, { roomId: roomId })).log;
	}

	actionMessage(action) {
		if (action.data.message === "") return this.sendError('Message missing', 'Error');
		this.updateChatLogs(this.chatRooms, this.users, this.io,
			action.data.nickname, this.chatLog, action.data.message);
	}

	updateChatLogs(chatRooms, users, io, nickname, chatLog, message) {
		const user = _.find(users, { nickname: nickname });
		const room = ChatRoomController.whichRoomUserIn(chatRooms, user.id);
		let chatlog = this.getChatLogForRoom(chatLog, room.id);
		console.log(chatlog.log);
		const newId = (chatlog.length > 0 ? _.last(chatlog).id + 1 : 0);
		const newMessage = {
			id: newId,
			owner: user.id,
			message: message,
			date: new Date()
		};
		chatlog.push(newMessage);
		this.updateChatLogsAll(room.name, io, chatlog);
	}

	updateChatLogsAll(roomName, io, chatLog) {
		io.to(roomName).emit('action', { //broadcast to everyone
			type: 'ROOM_CHAT_UPDATE',
			data: {
				chatLog: chatLog
			}
		});
	}

	actionJoinRoom(action) {
		const roomId = action.data.roomId;

		if (roomId === undefined || roomId === null) return this.sendError('Room Id missing', 'Error');
		const user = UserController.getUserWithSocketId(this.users, this.socket.id);
		const currentRoomName = ChatRoomController.whichRoomUserIn(this.chatRooms, user.id).name;

		ChatRoomController.joinRoom(this.chatRooms, roomId, user);
		this.updateRoomsAll(this.chatRooms, this.users, this.io);
		const roomName = ChatRoomController.getRoomNameWithId(this.chatRooms, roomId).name;

		this.socket.leave(currentRoomName, (error) => {
			this.sendError(error, 'Error')
		});
		this.socket.join(roomName);
		const chatlog = this.getChatLogForRoom(this.chatLog, roomId);
		this.updateChatLogsAll(roomName, this.io, chatlog);
	}

	// Update for everyone
	updateRoomsAll(chatRooms, users, io) {
		ChatRoomController.updateRooms(chatRooms, users);

		io.sockets.emit('action', { //broadcast to everyone
			type: 'ROOM_UPDATE',
			data: {
				chatRooms: chatRooms,
				users: users
			}
		});
	}

	// Update for everyone except yourself
	updateRoomsOthers(chatRooms, users, socket) {
		ChatRoomController.updateRooms(chatRooms, users);

		socket.broadcast.emit('action', {
			type: 'ROOM_UPDATE',
			data: {
				chatRooms: chatRooms,
				users: users
			}
		});
	}

	sendError(message, severity) {
		this.socket.emit('action', {
			type: 'SERVER_ERROR',
			data: {
				message,
				severity
			}
		});
	}

}

module.exports = SocketIoController;
