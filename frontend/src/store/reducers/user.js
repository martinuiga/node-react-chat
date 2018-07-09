import { SET_NICKNAME } from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const userInitialState = {
    nickname: ""
}

const setNickname = (state, action) => {
    return updateObject(state, {
        nickname: action.nickname
    });
};

export default (state = userInitialState, action) => {
    switch (action.type) {
        case SET_NICKNAME:
            return setNickname(state, action);
        default:
            return state
    }
}