import React, { Fragment, Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { compose } from 'redux';

import { styles } from './LayoutStyles';
import MainHeader from '../../components/MainHeader/MainHeader';
import ChatArea from '../../components/ChatArea/ChatArea';
import Modal from '../../components/Modal/Modal';
import * as actions from "../../store/actions/index";
import SideMenu from "../../components/SideMenu/SideMenu";
import Snackbar from '../../components/Snackbar/Snackbar';

class Layout extends Component {
	state = {
		nickname: "",
		error: false,
	}

	componentWillMount() {
		const nick = localStorage.getItem('nickname');
		if (nick) {
			this.props.setNickname(nick);
			this.props.initialize(nick);
		}
	}

	handleSnackClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.props.closeSnack();
	};

	handleModalClose = () => {
		this.setState({ error: true });
	};

	handleModalSubmit = () => {
		if (this.state.nickname !== "") {
			this.setState({ error: false });
			localStorage.setItem('nickname', this.state.nickname);
			this.props.setNickname(this.state.nickname);
			this.props.initialize(this.state.nickname);
		} else {
			this.setState({ error: true });
		}
	};

	handleModalInputChange = (event) => {
		this.setState({ nickname: event.target.value });
	};

	render() {
		const { classes } = this.props;
		let content = "";

		if (this.props.nickname !== "" && !this.props.modalOpen && !this.props.nickInUse) {
			content = (
				<Grid
					container
					spacing={16}>
					<Grid
						item
						xs={3}>
						<SideMenu
							chatRooms={this.props.chatRooms}
							joinRoom={this.props.joinRoom}
							createRoom={this.props.createRoom}
						/>
					</Grid>
					<Grid
						item
						xs={9}>
						<ChatArea
							chatRooms={this.props.chatRooms}
							chatLog={this.props.chatLog}
							users={this.props.users}
							typers={this.props.typers}
						/>
					</Grid>
				</Grid>
			)
		}

		return (
			<Fragment>
				<Modal
					open={this.props.modalOpen}
					submit={this.handleModalSubmit}
					change={this.handleModalInputChange}
					text="Enter Your Nickname"
					label="Nickname"
					errorMessage={this.props.nickInUse ? "Nickname is in use" : ""}
					error={this.state.error || this.props.nickInUse} />
				<MainHeader />
				<div className={classes.root}>
					{content}
				</div>
				<Snackbar
					open={this.props.snackOpen}
					close={this.handleSnackClose}
					message={this.props.serverError.message}
					severity={this.props.serverError.severity} />
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		nickname: state.user.nickname,
		chatRooms: state.socket.chatRooms,
		nickInUse: state.socket.nickInUse,
		modalOpen: state.socket.modalOpen,
		serverError: state.socket.serverError,
		snackOpen: state.socket.snackOpen,
		chatLog: state.socket.chatLog,
		users: state.socket.users,
		typers: state.socket.typers
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		initialize: (nickname) => {
			dispatch(actions.initialize(nickname))
		},
		setNickname: (nickname) => {
			dispatch(actions.setNickname(nickname))
		},
		joinRoom: (id) => {
			dispatch(actions.joinRoom(id))
		},
		closeSnack: () => {
			dispatch(actions.closeSnack())
		},
		createRoom: (roomName) => {
			dispatch(actions.createRoom(roomName))
		}
	}
};

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(Layout);
