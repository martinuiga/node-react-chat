import {
	CONN_STATUS,
	INITIALIZE_ROOMS,
	NEW_NAME_REQUIRED,
	ROOM_UPDATE,
	SERVER_ERROR,
	CLOSE_SNACK
} from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	connection: 0,
	modalOpen: (localStorage.getItem('nickname') ? false : true),
	chatRooms: [],
	chatLog: [],
	nickInUse: false,
	serverError: {},
	snackOpen: false
};

const setConnection = (state, action) => {
	return updateObject(state, {
		connection: action.status
	});
};

const setMessageRoomData = (state, action) => {
	localStorage.setItem('id', action.data.id);
	return updateObject(state, {
		chatRooms: action.data.chatRooms,
		chatLog: action.data.chatLog,
		modalOpen: false,
		nickInUse: false
	});
};

const setUpdateRoom = (state, action) => {
	return updateObject(state, {
		chatRooms: action.data.chatRooms
	});
};

const newNameRequired = (state, action) => {
	localStorage.clear();
	return updateObject(state, {
		modalOpen: true,
		nickInUse: true
	});
};

const serverError = (state, action) => {
	return updateObject(state, {
		serverError: action.data,
		snackOpen: true
	})
};

const closeSnack = (state, action) => {
	return updateObject(state, {
		snackOpen: false
	})
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CONN_STATUS:
			return setConnection(state, action);
		case INITIALIZE_ROOMS:
			console.log(action);
			return setMessageRoomData(state, action);
		case NEW_NAME_REQUIRED:
			console.log(action);
			return newNameRequired(state, action);
		case ROOM_UPDATE:
			return setUpdateRoom(state, action);
		case SERVER_ERROR:
			return serverError(state, action);
		case CLOSE_SNACK:
			return closeSnack(state, action);
		default:
			return state;
	}
}
