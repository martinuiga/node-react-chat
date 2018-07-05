import { SEND_TO_SERVER_EXAMPLE } from '../../constants/constants';

export const sendResponse = (message) => {
	console.log('to_srv');
	return {
		type: SEND_TO_SERVER_EXAMPLE,
		data: {
			message
		}
	}
};
