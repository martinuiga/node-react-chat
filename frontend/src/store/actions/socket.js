import { INITIALIZE, JOIN_GROUP, SEND_TO_SERVER_EXAMPLE } from "./actionTypes";

export const initialize = (nickname) => {
	return {
		type: INITIALIZE,
		data: {
			nickname
		}
	}
};

export const sendResponse = (message) => {
	return {
		type: SEND_TO_SERVER_EXAMPLE,
		data: {
			message
		}
	}
};

export const joinRoom = (id) => {
	console.log('join room');
	return {
		type: JOIN_GROUP,
		data: {
			userId: localStorage.getItem('id'),
			groupId: id
		}
	}
};
