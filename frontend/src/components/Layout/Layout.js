import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { styles } from './LayoutStyles';
import Header from '../Header/Header';
import ChatArea from '../ChatArea/ChatArea';

const Layout = (props) => {
	const { classes } = props;

	const placeHolderNames = ["Bob", "Tom", "Tiit", "Priit"];
	const placeHolderRoom = "Cool Stories";

	return (
		<Fragment>
			<Header />
			<div className={classes.root}>
				<Grid container
					spacing={16}>
					<Grid item
						xs={3}>
						{/* Placeholder */}
						<Paper className={classes.paper}>SideMenu</Paper>
					</Grid>
					<Grid item
						xs={9}>
						<ChatArea
							users={placeHolderNames}
							room={placeHolderRoom} />
					</Grid>
				</Grid>
			</div>
		</Fragment>
	);

};

export default withStyles(styles)(Layout);