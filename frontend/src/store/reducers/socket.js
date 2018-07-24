import * as actionTypes from "../actions/actionTypes";
import { updateObject, pushLog, pushTyper } from "../../shared/utility";

const initialState = {
	connection: 0,
	modalOpen: (localStorage.getItem('nickname') ? false : true),
	chatRooms: [],
	nickInUse: false,
	serverError: {},
	snackOpen: false,
	users: [],
	chatLog: [],
	typers: []
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
		users: action.data.users,
		modalOpen: false,
		nickInUse: false
	});
};

const setUpdateRoom = (state, action) => {
	return updateObject(state, {
		chatRooms: action.data.chatRooms,
		users: action.data.users
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

const updateLogFull = (state, action) => {
	return updateObject(state, {
		chatLog: action.data.chatLog
	})
}

const updateLogSingle = (state, action) => {
	return updateObject(state, {
		chatLog: pushLog(state.chatLog, action.data.message)
	})
};

const updateUsers = (state, action) => {
	console.log(action.data.typingStatus);
	return updateObject(state, {
		typers: pushTyper(state.typers, action.data.typingStatus)
	});
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CONN_STATUS:
			return setConnection(state, action);
		case actionTypes.INITIALIZE_ROOMS:
			console.log(action);
			return setMessageRoomData(state, action);
		case actionTypes.NEW_NAME_REQUIRED:
			console.log(action);
			return newNameRequired(state, action);
		case actionTypes.USERS_UPDATE:
			return updateUsers(state, action);
		case actionTypes.ROOM_UPDATE:
			return setUpdateRoom(state, action);
		case actionTypes.UPDATE_LOG_FULL:
			return updateLogFull(state, action);
		case actionTypes.UPDATE_LOG_SINGLE:
			return updateLogSingle(state, action);
		case actionTypes.SERVER_ERROR:
			return serverError(state, action);
		case actionTypes.CLOSE_SNACK:
			return closeSnack(state, action);
		default:
			return state;
	}
}
