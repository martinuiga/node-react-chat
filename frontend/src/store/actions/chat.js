import { SEND_MESSAGE } from "./actionTypes";

export const sendMessage = (message, nickname) => {
	return {
		type: SEND_MESSAGE,
		data: {
			message, nickname
		}
	}
};
