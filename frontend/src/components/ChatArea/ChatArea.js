import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Messages from './Messages/Messages';
import styles from './ChatAreaStyles';
import Chatfooter from '../../containers/chat-footer/chat-footer';

const ChatArea = (props) => {
	const { classes } = props;

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
					users={props.users}
					room={props.room} />
			</Grid>
			<Grid item
				xs={'auto'}>
				<Paper
					className={[classes.messageArea,classes.paper].join(" ")}>
					<Grid container
						direction='column'
						justify='flex-end'
						className={classes.test}>
						<Messages />
						<Footer
							users={props.users} />
					</Grid>
				</Paper>
			</Grid>
			{/* Placeholder */}
			<Grid item
				xs={'auto'}>
				<Paper className={classes.paper}>
					<Chatfooter />
				</Paper>
			</Grid>
		</Grid>

	);
};

export default withStyles(styles)(ChatArea);