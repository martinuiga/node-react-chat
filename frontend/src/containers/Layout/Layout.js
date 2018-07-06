import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import { sendResponse } from "../../store/actions/index";
import Example from "../Example/Example";
import Header from "../Header/Header";
import Chatfooter from "../chat-footer/chat-footer";

class Layout extends Component {
	render() {
		return (
			<Fragment>
				<main style={{marginTop: "100px"}}>
					{this.props.children}
				</main>
				<Header connection={this.props.connection}/>
				<Example
					message={this.props.message}
					response={this.props.sendResponse}
				/>
				<Chatfooter/>
			</Fragment>
		)
	}
}

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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Layout);
