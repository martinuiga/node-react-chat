import { INITIALIZE, SEND_TO_SERVER_EXAMPLE } from "./actionTypes";

export const initialize = (nickname) => {
    return {
        type: INITIALIZE,
        nickname: nickname
    }
};

export const sendResponse = (message) => {
    console.log('to_srv');
    return {
        type: SEND_TO_SERVER_EXAMPLE,
        data: {
            message
        }
    }
};
