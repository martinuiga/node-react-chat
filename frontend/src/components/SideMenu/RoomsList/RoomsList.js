import React, { Fragment } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import styles from './RoomsListStyles';
import { withStyles } from "@material-ui/core/styles/index";

const RoomsList = (props) => {
	const { classes } = props;
	const { chatRooms } = props;
	let state = { open: true };

	console.log(props);

	let chatRoomMenuItems = [];

	_.forEach(chatRooms, (chatRoom) => {
		chatRoomMenuItems.push(
			<MenuItem key={chatRoom.id}>
				{chatRoom.name}
			</MenuItem>
		);
	});
	// return chatRoomMenuItems;

	return (
		<Fragment>

			{chatRoomMenuItems}


			<List
				component="nav"
				subheader={<ListSubheader component="div">Chat Rooms</ListSubheader>}
			>
				<ListItem button>
					<ListItemIcon>
						<SendIcon />
					</ListItemIcon>
					<ListItemText inset primary="Sent mail" />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<DraftsIcon />
					</ListItemIcon>
					<ListItemText inset primary="Drafts" />
				</ListItem>
				<ListItem button onClick={this.handleClick}>
					<ListItemIcon>
						<InboxIcon />
					</ListItemIcon>
					<ListItemText inset primary="Inbox" />
					{state.open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={state.open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem button className={classes.nested}>
							<ListItemIcon>
								<StarBorder />
							</ListItemIcon>
							<ListItemText inset primary="Starred" />
						</ListItem>
					</List>
				</Collapse>
			</List>
		</Fragment>
	);
};

export default withStyles(styles)(RoomsList);
