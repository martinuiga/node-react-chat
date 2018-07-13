import {
	CONN_STATUS,
	EXAMPLE_FROM_SERVER,
	INITIALIZE_ROOMS,
	NEW_NAME_REQUIRED,
	ROOM_UPDATE
} from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	connection: 0,
	message: null,
	chatRooms: [],
	chatLog: []
};

const setConnection = (state, action) => {
	return updateObject(state, {
		connection: action.status
	});
};

const setMessage = (state, action) => {
	return updateObject(state, {
		message: action.data.message
	});
};

const setMessageRoomData = (state, action) => {
	localStorage.setItem('id', action.data.id);
	return updateObject(state, {
		chatRooms: action.data.chatRooms,
		chatLog: action.data.chatLog
	})
};

const setUpdateRoom = (state, action) => {
	return updateObject(state, {
		chatRooms: action.data.chatRooms
	})
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CONN_STATUS:
			return setConnection(state, action);
		case EXAMPLE_FROM_SERVER:
			return setMessage(state, action);
		case INITIALIZE_ROOMS:
			console.log(action);
			return setMessageRoomData(state, action);
		case NEW_NAME_REQUIRED:
			console.log(action);
		// TODO Remove prevous nickname and ID from localstorage and display modal again
		// action.data:
		// {
		// 	nickname: 'old_name' // Can be used to display custom error
		// }
			return state;
		case ROOM_UPDATE:
			return setUpdateRoom(state, action);
		default:
			return state;
	}
}
