const _ = require('lodash');

class ChatRoomController {

	joinRoom(chatRooms, roomId, user) {
		if (!user || !user.id) return null;
		const isAlreadyInAnyRoom = !!this.whichRoom(chatRooms, user.id);

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

	whichRoom(chatRooms, userId) {
		let room = null;

		_.forEach(chatRooms, chatRoom => {
			const user = _.find(chatRoom.connectedUsers, { id: userId });

			if (!user) return;
			room = chatRoom;
			return false;
		});
		return room;
	}
}

module.exports = new ChatRoomController();
