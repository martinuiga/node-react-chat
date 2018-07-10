import React, { Fragment, Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { compose } from 'redux';

import { styles } from './LayoutStyles';
import Header from '../../components/Header/Header';
import ChatArea from '../../components/ChatArea/ChatArea';
import Modal from '../../components/Modal/Modal';
import { initialize, setNickname } from "../../store/actions/index";
import SideMenu from "../../components/SideMenu/SideMenu";
import { joinGroup } from "../../store/actions/socket";

class Layout extends Component {
	state = {
		modalOpen: (localStorage.getItem('nickname') ? false : true),
		nickname: "",
		error: false
	}

	componentWillMount() {
		const nick = localStorage.getItem('nickname');
		if (nick) {
			this.props.setNickname(nick);
			this.props.initialize(nick);
		}
	}

	handleModalClose = () => {
		this.setState({ error: true });
	};

	handleModalSubmit = () => {
		if (this.state.nickname !== "") {
			this.setState({ modalOpen: false });
			this.setState({ error: true });
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

		if (this.props.nickname !== "" && !this.state.modalOpen) {
			content = (
				<Grid
					container
					spacing={16}>
					<Grid
						item
						xs={3}>
						<SideMenu
							chatRooms={this.props.chatRooms}
							joinGroup={this.props.joinGroup}
						/>
					</Grid>
					<Grid
						item
						xs={9}>
						<ChatArea
							chatRooms={this.props.chatRooms}
						/>
					</Grid>
				</Grid>
			)
		}

		return (
			<Fragment>
				<Modal
					open={this.state.modalOpen}
					close={this.handleModalClose}
					submit={this.handleModalSubmit}
					change={this.handleModalInputChange}
					text="Enter Your Nickname"
					label="Nickname"
					error={this.state.error} />
				<Header />
				<div className={classes.root}>
					{content}
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		// connection: state.socket.connection,
		// message: state.socket.message,
		nickname: state.user.nickname,
		chatRooms: state.socket.chatRooms
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		initialize: (nickname) => {
			dispatch(initialize(nickname))
		},
		setNickname: (nickname) => {
			dispatch(setNickname(nickname))
		},
		joinGroup: (id) => {
			dispatch(joinGroup(id))
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
