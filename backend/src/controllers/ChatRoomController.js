const _ = require('lodash');

class ChatRoomController {

	joinRoom(chatRooms, id) {

	}

	whichRoom(chatRooms, userId) {
		let roomId;

		_.forEach(chatRooms, chatRoom => {
			const user = _.find(chatRoom.connectedUsers, { id: userId });
			if (!user) return;
			roomId = chatRoom;
			return false;
		});
		return roomId;
	}
}

module.exports = new ChatRoomController();
