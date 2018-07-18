const _ = require('lodash');

const socketActions = require('../constants/socketActions');
const ChatRoomController = require('./ChatRoomController');
const UserController = require('./UserController');
const ChatLogController = require('./ChatLogController');

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
				case socketActions.CREATE_ROOM:
					return this.actionCreateRoom(action);
				default:
					return console.log('Unknown action ', action.type);
			}
		});

		this.socket.on('disconnect', () => {
			console.log("disconnected");
			UserController.userDisconnected(this.users, this.socket);
			ChatLogController.checkAndClearLogs(this.users, this.chatLog, this.chatRooms);
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
				chatLog: ChatLogController.getChatLogForRoom(this.chatLog, 0),
				users: users
			}
		});

		this.updateRoomsOthers(this.chatRooms, this.users, this.socket);
		const roomName = ChatRoomController.getRoomNameWithId(this.chatRooms, 0).name;

		this.socket.join(roomName);
		ChatLogController.updateChatLogFull(roomName, this.io, ChatLogController.getChatLogForRoom(this.chatLog, 0));
	}

	actionCreateRoom(action) {
		if (action.data.roomName === "") return this.sendError('Room name missing', 'Error');
		const newId = ChatRoomController.createRoom(this.chatRooms, action.data.roomName);
		ChatLogController.createNewChatLog(this.chatLog, newId);
		this.updateRoomsAll(this.chatRooms, this.users, this.io);
	}

	actionMessage(action) {
		if (action.data.message === "") return this.sendError('Message missing', 'Error');
		ChatLogController.updateChatLog(this.chatRooms, this.users, this.io,
			action.data.nickname, this.chatLog, action.data.message);
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
			//this.sendError(error, 'Error')  <-- throwing errors on every join
		});
		this.socket.join(roomName);
		const chatlog = ChatLogController.getChatLogForRoom(this.chatLog, roomId);
		ChatLogController.updateChatLogFull(roomName, this.io, chatlog);
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
