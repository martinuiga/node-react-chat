const _ = require('lodash');

class ChatRoomController {

	joinRoom(chatRooms, roomId, user) {
		if (!user || !user.id) return null;
		const isAlreadyInAnyRoom = !!this.whichRoomUserIn(chatRooms, user.id);

		if (isAlreadyInAnyRoom) {
			chatRooms = this.leaveRoom(chatRooms, user);
		}
		_.forEach(chatRooms, (chatRoom) => {
			if (chatRoom.id !== roomId) return;
			const isUserInRoom = !!_.find(chatRoom.connectedUsers, { id: user.id });

			if (isUserInRoom) return false;
			chatRoom.connectedUsers.unshift({
				id: user.id,
				nickname: user.nickname
			});
			return true;
		});
	}

	leaveRoom(chatRooms, userToRemove) {
		_.forEach(chatRooms, (chatRoom) => {
			_.forEach(chatRoom.connectedUsers, (user) => {
				if (user.id !== userToRemove.id) return;
				_.remove(chatRoom.connectedUsers, user);
				return false;
			});
		});
		return chatRooms;
	}

	updateRooms(chatRooms, users) {
		_.forEach(chatRooms, (chatRoom) => {
			chatRoom.connectedUsers.forEach(user => { // Using regular sync foreach since removing elements while in it
				const userInRoom = _.find(users, { id: user.id });

				if (userInRoom && userInRoom.connected) return;
				_.remove(chatRoom.connectedUsers, user);
			});
		});
		return chatRooms;
	}

	whichRoomUserIn(chatRooms, userId) {
		let room = null;

		_.forEach(chatRooms, (chatRoom) => {
			const user = _.find(chatRoom.connectedUsers, { id: userId });

			if (!user) return;
			room = chatRoom;
			return false;
		});
		return room;
	}

	getRoomNameWithId(chatRooms, id) {
		return _.find(chatRooms, { id });
	}

	filterOffline(chatRooms) {
		let filteredOffline = chatRooms;
		_.forEach(filteredOffline, (chatRoom) => {
			chatRoom.connectedUsers.forEach(user => {
				console.log(user);
				if (user.connected) return;
				_.remove(chatRoom.connectedUsers, user);
			});
		});
		return filteredOffline;
	}

	updateChatLog(chatRooms, message, users) {
		const owner = _.find(users, { nickname: message.nickname });
		const chatRoom = this.whichRoomUserIn(chatRooms, owner.id);
		const newId = (chatRoom.chatLog.length > 0 ? _.last(chatRoom.chatLog).id + 1 : 0);
		const newMessage = {
			id: newId,
			owner: owner.id,
			message: message.message,
			date: new Date()
		};

		chatRoom.chatLog.push(newMessage);
	}

	createRoom(chatRooms, roomName) {
		const newId = chatRooms.length;
		const newRoom = {
			id: newId,
			name: roomName,
			connectedUsers: [],
		}
		chatRooms.push(newRoom);
		return newId;
	}

	deleteRoom(id, chatRooms) {
		_.remove(chatRooms, {
			id: id
		});
	}
}

module.exports = new ChatRoomController();
