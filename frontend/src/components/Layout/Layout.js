import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { compose } from 'redux';

import { styles } from './LayoutStyles';
import Header from '../Header/Header';
import ChatArea from '../ChatArea/ChatArea';
import SideMenu from '../SideMenu/SideMenu';
import { sendResponse } from "../../store/actions";
import { connect } from "react-redux";

const Layout = (props) => {
	const {classes} = props;

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
						<SideMenu

						/>
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

const mapStateToProps = (state) => {
	return {
		connection: state.socket.connection,
		message: state.socket.message
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		sendResponse: (message) => {
			dispatch(sendResponse(message))
		},
	}
};

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(Layout);
