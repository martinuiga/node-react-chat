import { CONN_STATUS, EXAMPLE_FROM_SERVER } from "../../constants/constants";

const initialState = {
	connection: 0,
	message: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case CONN_STATUS:
			console.log(action.status);
			return Object.assign({}, state, {
				connection: action.status
			});
		case EXAMPLE_FROM_SERVER:
			console.log(action.data.message);
			return Object.assign({}, state, {
				message: action.data.message
			});
		default:
			return state;
	}
}
