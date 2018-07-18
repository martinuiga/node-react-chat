import * as actionTypes from "./actionTypes";

export const initialize = (nickname) => {
	return {
		type: actionTypes.INITIALIZE,
		data: {
			nickname
		}
	}
};

export const sendResponse = (message) => {
	return {
		type: actionTypes.SEND_TO_SERVER_EXAMPLE,
		data: {
			message
		}
	}
};

export const joinRoom = (id) => {
	console.log('join room');
	return {
		type: actionTypes.JOIN_GROUP,
		data: {
			userId: localStorage.getItem('id'),
			roomId: id
		}
	}
};

export const closeSnack = () => {
	return {
		type: actionTypes.CLOSE_SNACK,
		data: {

		}
	}
};

export const createRoom = (roomName) => {
	return {
		type: actionTypes.CREATE_ROOM,
		data: {
			roomName
		}
	}
}
