import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import styles from './SideMenuStyles';

const SideMenu = (props) => {
	const { classes } = props;

	return (
		<Paper>
			<Drawer
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<MenuItem>Menu Item</MenuItem>
				<MenuItem>Menu Item 2</MenuItem>
			</Drawer>
		</Paper>
	);
};

export default withStyles(styles)(SideMenu);
