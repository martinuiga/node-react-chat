import { SEND_TO_SERVER_EXAMPLE } from "./actionTypes";

export const sendResponse = (message) => {
	return {
		type: SEND_TO_SERVER_EXAMPLE,
		data: {
			message
		}
	}
};
