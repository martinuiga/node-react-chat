const _ = require('lodash');
const ChatRoomController = require('./ChatRoomController');

class ChatLogController {
	getChatLogForRoom(chatLog, roomId) {
		return (_.find(chatLog, { roomId: roomId })).log;
	}

	updateChatLog(chatRooms, users, io, nickname, chatLog, message) {
		const user = _.find(users, { nickname: nickname });
		const room = ChatRoomController.whichRoomUserIn(chatRooms, user.id);
		let chatlog = this.getChatLogForRoom(chatLog, room.id);
		const newId = (chatlog.length > 0 ? _.last(chatlog).id + 1 : 0);
		const newMessage = {
			id: newId,
			owner: user.id,
			message: message,
			date: new Date()
		};
		this.pushLog(chatlog, newMessage);
		this.updateChatLogSingle(room.name, io, newMessage);
	}

	updateChatLogSingle(roomName, io, message) {
		io.to(roomName).emit('action', {
			type: 'UPDATE_LOG_SINGLE',
			data: {
				message: message
			}
		});
	}

	updateChatLogFull(roomName, io, chatLog) {
		io.to(roomName).emit('action', {
			type: 'UPDATE_LOG_FULL',
			data: {
				chatLog: chatLog
			}
		});
	}

	pushLog(arr, elem) {
		if (arr.length >= 100) {
			arr.shift();
		}
		arr.push(elem);
	}

	checkAndClearLogs(users, chatLog) {
		_.forEach(chatLog, roomLog => {
			let canDelete = true;
			_.forEach(roomLog.log, message => {
				const activeUser = _.find(users, { id: message.owner });
				if (activeUser.connected) {
					canDelete = false;
					return false;
				}
			})
			if (canDelete) roomLog.log.length = 0;
		})
	}
}

module.exports = new ChatLogController();
