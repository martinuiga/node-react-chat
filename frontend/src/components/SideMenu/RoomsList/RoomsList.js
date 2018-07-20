import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import PlusIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ChatConnectedIcon from '@material-ui/icons/ChatBubble';
import ChatNotConnectedIcon from '@material-ui/icons/ChatBubbleOutline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import styles from './RoomsListStyles';
import { withStyles } from "@material-ui/core/styles/index";
import Modal from '../../Modal/Modal';

class RoomsList extends Component {
	state = {
		open: {},
		modalOpen: false,
		newRoomName: "",
		error: false
	};

	myId = parseInt(localStorage.getItem('id'), 10);

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

	userList(connectedUsers, chatRoomId) {
		const { classes } = this.props;
		const usersList = [];
		let selfInRoom = true;

		_.forEach(connectedUsers, (user) => {
			if (user.id === this.myId) selfInRoom = false;
			usersList.push(
				<ListItem button className={classes.nested} key={user.id}>
					<ListItemIcon>
						{user.id === this.myId ? <PersonIcon /> : <PersonOutlineIcon />}
					</ListItemIcon>
					<ListItemText inset primary={user.nickname} />
				</ListItem>
			);
		});

		if (selfInRoom) {
			usersList.unshift(
				this.addJoinRoomList(chatRoomId)
			);
		}

		return usersList;
	}

	addJoinRoomList = (chatRoomId) => {
		const { classes } = this.props;

		return (
			<ListItem button className={classes.nested} key={"jr" + chatRoomId} onClick={() => {
				this.handleGroupJoin(chatRoomId);
			}}>
				<ListItemIcon>
					<PlusIcon />
				</ListItemIcon>
				<ListItemText inset primary="Join Room" />
			</ListItem>
		);

	}

	handleCreateRoom = () => {
		this.setState({ modalOpen: true })
	}

	handleModalSubmit = () => {
		if (this.state.newRoomName !== "") {
			this.props.createRoom(this.state.newRoomName);
			this.setState({
				newRoomName: "",
				modalOpen: false
			});
		} else {
			this.setState({error: true});
		}

	}

	handleModalInputChange = (event) => {
		this.setState({ newRoomName: event.target.value });
	};

	handleModalClose = () => {
		this.setState({
			newRoomName: "",
			modalOpen: false
		});
	};

	render() {
		const { chatRooms } = this.props;
		let chatRoomListItems = [];

		const roomModal = (
			<Fragment>
				<Modal
					open={this.state.modalOpen}
					close={this.handleModalClose}
					submit={this.handleModalSubmit}
					change={this.handleModalInputChange}
					text="Enter New Room Name"
					label="Room Name"
					errorMessage=""
					error={this.state.error} />
			</Fragment>
		);

		_.forEach(chatRooms, (chatRoom) => {
			let subList;
			const hasUsers = !!(chatRoom.connectedUsers.length);
			if (!hasUsers) {
				subList = this.addJoinRoomList(chatRoom.id);
			} else {
				subList = (
					<Collapse in={this.state.open[chatRoom.id]} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{this.userList(chatRoom.connectedUsers, chatRoom.id)}
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
			const connectedToRoom = !!_.find(chatRoom.connectedUsers, { id: this.myId });

			chatRoomListItems.push(
				<Fragment key={chatRoom.id}>
					<ListItem button key={chatRoom.id}>
						<ListItemIcon>
							{connectedToRoom ? <ChatConnectedIcon /> : <ChatNotConnectedIcon />}
						</ListItemIcon>
						<ListItemText inset primary={chatRoom.name} />
						{hasUsers ? expandArrow : null}
					</ListItem>
					{subList}
				</Fragment>
			);
		});
		return (
			<Fragment>
				<List
					component="nav"
					subheader={<ListSubheader component="div">Chat Rooms</ListSubheader>}
				>
					{chatRoomListItems}
					<ListItem button key="cr" onClick={() => {
						this.handleCreateRoom();
					}}>
						<ListItemIcon>
							<PlusIcon />
						</ListItemIcon>
						<ListItemText inset primary="Create Room" />
					</ListItem>
				</List>
				{roomModal}
			</Fragment>
		);
	}
}

export default withStyles(styles)(RoomsList);
