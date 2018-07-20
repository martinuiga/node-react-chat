import * as actionTypes from "./actionTypes";

export const sendMessage = (message, nickname) => {
	return {
		type: actionTypes.SEND_MESSAGE,
		data: {
			message, nickname
		}
	}
};
