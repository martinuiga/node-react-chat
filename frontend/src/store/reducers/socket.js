import { CONN_STATUS, EXAMPLE_FROM_SERVER, INITIALIZE_ROOMS } from "../actions/actionTypes";
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
	return updateObject(state, {
		chatRooms: action.data.chatRooms,
		chatLog: action.data.chatLog
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
		default:
			return state;
	}
}
