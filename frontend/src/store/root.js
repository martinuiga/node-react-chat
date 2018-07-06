import { createStore, combineReducers, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';
import { CONN_STATUS } from "../store/actions/actionTypes";

import socketReducer from './reducers/socket';

let socket = io(process.env.REACT_APP_SOCKET_ADDR);
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const rootReducer = combineReducers({
	socket: socketReducer
});

const store = createStore(
	rootReducer,
	applyMiddleware(socketIoMiddleware)
);

// listens to stuff sent from server
store.subscribe(() => {
	console.log('new client state', store.getState());
});
// Initialize should fetch all starting data including menu, settings etc
store.dispatch({
	type: 'server/initialize',
});
socket.on('connect', () => {
	if (store.getState().socket.connection !== 1) {
		store.dispatch({
			type: CONN_STATUS,
			status: 1
		});
	}
});
socket.on('disconnect', () => {
	if (store.getState().socket.connection !== 0) {
		store.dispatch({
			type: CONN_STATUS,
			status: 0
		});
	}
});

export default store;