import { SEND_TO_SERVER_EXAMPLE } from "./actionTypes";

export const sendResponse = (message) => {
	console.log('to_srv');
	return {
		type: SEND_TO_SERVER_EXAMPLE,
		data: {
			message
		}
	}
};
