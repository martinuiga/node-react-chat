import { createStore, combineReducers, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';

import socketReducer from './reducers/socket';
import userReducer from './reducers/user';
import * as actionTypes from "./actions/actionTypes";

let socket = io(process.env.REACT_APP_SOCKET_ADDR);
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const rootReducer = combineReducers({
	socket: socketReducer,
	user: userReducer
});

// const reduxDevTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null;

const store = createStore(
	rootReducer,
	// reduxDevTools,
	applyMiddleware(socketIoMiddleware)
);

//Initialize should fetch all starting data including menu, settings etc
store.dispatch({
	type: 'server/initialize',
});
socket.on('connect', () => {
	if (store.getState().socket.connection !== 1) {
		store.dispatch({
			type: actionTypes.CONN_STATUS,
			status: 1
		});
	}
});
socket.on('disconnect', () => {
	if (store.getState().socket.connection !== 0) {
		store.dispatch({
			type: actionTypes.CONN_STATUS,
			status: 0
		});
	}
});
socket.on('reconnect', () => {
	store.dispatch({
		type: actionTypes.RECONNECT,
		data: {
			nickname: localStorage.getItem('nickname'),
			id: localStorage.getItem('id')
		}
	})
});

export default store;
