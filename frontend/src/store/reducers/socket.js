import { CONN_STATUS, EXAMPLE_FROM_SERVER } from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	connection: 0,
	message: null
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

export default function (state = initialState, action) {
	switch (action.type) {
		case CONN_STATUS:
			return setConnection(state, action);
		case EXAMPLE_FROM_SERVER:
			return setMessage(state, action);
		default:
			return state;
	}
}
