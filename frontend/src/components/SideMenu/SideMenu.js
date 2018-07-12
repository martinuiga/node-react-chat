import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import styles from './SideMenuStyles';
import RoomsList from "./RoomsList/RoomsList";

const SideMenu = (props) => {
	const { classes } = props;
	const { chatRooms } = props;
	let roomsList = null;

	if (chatRooms.length) roomsList =
		<RoomsList
			chatRooms={chatRooms}
			joinRoom={props.joinRoom}
		/>;

	return (
		<Paper>
			<Drawer
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				{roomsList}
			</Drawer>
		</Paper>
	);
};

export default withStyles(styles)(SideMenu);
