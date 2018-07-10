import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ChatConnectedIcon from '@material-ui/icons/ChatBubble';
import ChatNotConnectedIcon from '@material-ui/icons/ChatBubbleOutline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import styles from './RoomsListStyles';
import { withStyles } from "@material-ui/core/styles/index";

class RoomsList extends Component {
	state = { open: {} };

	constructor(props) {
		super(props);
		const keyVal = {};

		// Create key value array for
		_.forEach(this.props.chatRooms, (chatRoom) => { // Lodash might have a better function for this
			keyVal[chatRoom.id] = true;
		});
		this.state.open = keyVal;
	}

	handleExpandToggle = (id) => {
		const newState = _.assign({}, this.state, {
			open: {
				[id]: !this.state.open[id]
			}
		});

		this.setState(newState);
	};

	handleGroupJoin = (id) => {
		this.props.joinRoom(id);
	};

	userList(connectedUsers) {
		const { classes } = this.props;
		const usersList = [];


		_.forEach(connectedUsers, (user) => {
			usersList.push(
				<ListItem button className={classes.nested} key={user.id}>
					<ListItemIcon>
						{user.self ? <PersonIcon /> : <PersonOutlineIcon />}
					</ListItemIcon>
					<ListItemText inset primary={user.name} />
				</ListItem>
			)
		});
		return usersList;
	}

	render() {
		const { chatRooms } = this.props;
		let chatRoomListItems = [];

		_.forEach(chatRooms, (chatRoom) => {
			let subList;
			const hasUsers = !!(chatRoom.connectedUsers.length);
			if (!hasUsers) {
				subList = null;
			} else {
				subList = (
					<Collapse in={this.state.open[chatRoom.id]} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{this.userList(chatRoom.connectedUsers)}
						</List>
					</Collapse>
				);
			}

			const expandLess = <ExpandLess
				button="true"
				onClick={() => {
					(hasUsers) ? this.handleExpandToggle(chatRoom.id) : null
				}}
			/>;
			const expandMore = <ExpandMore
				button="true"
				onClick={() => {
					(hasUsers) ? this.handleExpandToggle(chatRoom.id) : null
				}}
			/>;
			const expandArrow = this.state.open[chatRoom.id] ? expandLess : expandMore;

			chatRoomListItems.push(
				<Fragment key={chatRoom.id}>
					<ListItem button key={chatRoom.id}>
						<ListItemIcon>
							{chatRoom.connected ? <ChatConnectedIcon /> : <ChatNotConnectedIcon />}
						</ListItemIcon>
						<ListItemText inset primary={chatRoom.name} onClick={() => {
							this.handleGroupJoin(chatRoom.id);
						}}
						/>
						{hasUsers ? expandArrow : null}
					</ListItem>
					{subList}
				</Fragment>
			);
		});
		return (
			<List
				component="nav"
				subheader={<ListSubheader component="div">Chat Rooms</ListSubheader>}
			>
				{chatRoomListItems}
			</List>
		);
	}
}

export default withStyles(styles)(RoomsList);
