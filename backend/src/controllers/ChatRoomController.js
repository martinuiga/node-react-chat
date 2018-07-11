const _ = require('lodash');

class ChatRoomController {

	joinRoom(chatRooms, id) {

	}

	whichRoom(chatRooms, userId) {
		let room;

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
