import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Messages from './Messages/Messages';
import styles from './ChatAreaStyles';

const ChatArea = (props) => {
	const { classes } = props;

	return (
		<Grid container
			alignItems='stretch'
			spacing={8}>
			<Grid item
				xs={12}>
				<Header
					users={props.users}
					room={props.room} />
			</Grid>
			<Grid item
				xs={12}>
				<Paper
					className={classes.messageArea}>
					<Messages />
					<Footer
						users={props.users} />
				</Paper>
			</Grid>
		</Grid>

	);
};

export default withStyles(styles)(ChatArea);