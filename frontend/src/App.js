import React, { Component } from 'react';
import { connect } from "react-redux";

import Layout from './containers/Layout/Layout'
import Header from "./containers/Header/Header";
import { sendResponse } from './store/actions/sendResponse';
import Example from "./containers/Example/Example";

class App extends Component {
	render() {
		return (
			<Layout>
				<Header connection={this.props.connection}/>
				<Example
					message={this.props.message}
					response={this.props.sendResponse}
				/>
			</Layout>
		);
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
)(App);
