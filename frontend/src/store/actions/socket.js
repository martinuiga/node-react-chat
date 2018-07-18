import { INITIALIZE, JOIN_GROUP, SEND_TO_SERVER_EXAMPLE, CLOSE_SNACK, CREATE_ROOM } from "./actionTypes";

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
			roomId: id
		}
	}
};

export const closeSnack = () => {
	return {
		type: CLOSE_SNACK,
		data: {

		}
	}
};

export const createRoom = (roomName) => {
	return {
		type: CREATE_ROOM,
		data: {
			roomName
		}
	}
}
