import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Messages from './Messages/Messages';
import styles from './ChatAreaStyles';
import MessageInput from '../MessageInput/MessageInput';

const ChatArea = (props) => {
	const { classes } = props;
	const { chatRooms } = props;
	const usersObj = props.users;
	let chatLog;
	let users = [];
	let room = "";
	const myId = parseInt(localStorage.getItem('id'), 10);

	_.forEach(chatRooms, chatRoom => {
		const isUserInRoom = !!_.find(chatRoom.connectedUsers, { id: myId });
		if (isUserInRoom) {
			room = chatRoom;
			chatLog = chatRoom.chatLog
		}
	});
	// Can do this better
	_.forEach(room.connectedUsers, user => {
		users.push(user.nickname);
	});

	if (room.name === "") users = [];

	return (
		<Grid container
			className={classes.test}
			alignItems='stretch'
			justify='space-between'
			wrap='nowrap'
			direction='column'
			spacing={8}>
			<Grid item
				xs={'auto'}>
				<Header
					users={users}
					room={room.name} />
			</Grid>
			<Grid item
				xs={'auto'}>
				<Paper
					className={[classes.messageArea, classes.paper].join(" ")}>
					<Grid container
						direction='column'
						justify='flex-end'
						className={classes.test}>
						<Messages
							chatLog={chatLog}
							owner={myId}
							users={usersObj} />
						<Footer
							//Users that are typing go here
							users={users} />
					</Grid>
				</Paper>
			</Grid>
			<Grid item
				xs={'auto'}>
				<Paper className={classes.paper}>
					<MessageInput />
				</Paper>
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(ChatArea);
