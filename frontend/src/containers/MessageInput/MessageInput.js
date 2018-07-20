import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Textfield from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { sendMessage } from "../../store/actions/chat";

import './MessageInput.css';

class MessageInput extends Component {
	state = {
		input: ""
	};

	handleTextFieldChange = (e) => {
		this.setState({
			input: e.target.value
		});
	};

	handleButtonOnClick = (e) => {
		if (this.state.input !== "") {
			this.props.sendMessage(this.state.input, this.props.nickname)
			this.setState({
				input: ""
			});
		}
	};

	handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			this.handleButtonOnClick();
		}
	};

	render() {
		return (
			<Fragment>
				<Textfield onChange={this.handleTextFieldChange}
					value={this.state.input}
					placeholder="Input..."
					className="inputField"
					InputProps={{ disableUnderline: true }}
					onKeyDown={this.handleKeyPress}
					multiline={false}/>

				<Button className="sendButton"
					variant="contained"
					color="primary"
					onClick={this.handleButtonOnClick}>
					Send
				</Button>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		nickname: state.user.nickname
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		sendMessage: (message, nickname) => {
			dispatch(sendMessage(message, nickname))
		}
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MessageInput);
