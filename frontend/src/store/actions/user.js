import { SET_NICKNAME } from "./actionTypes";

export const setNickname = (nickname) => {
    return {
        type: SET_NICKNAME,
        data: {
            nickname
        }
    }
};
