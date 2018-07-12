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

	let users = [];
	let room = "";

	// Tried some fancy lodash functions, did not get it to work
	_.forEach(chatRooms, chatRoom => {
		_.forEach(chatRoom.connectedUsers, connectedUser => {
			users.push(connectedUser.name);
			if (connectedUser.self) {
				room = chatRoom.name;
			}
		});
	});

	if (room === "") users = [];

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
					room={room} />
			</Grid>
			<Grid item
				xs={'auto'}>
				<Paper
					className={[classes.messageArea, classes.paper].join(" ")}>
					<Grid container
						direction='column'
						justify='flex-end'
						className={classes.test}>
						<Messages />
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
