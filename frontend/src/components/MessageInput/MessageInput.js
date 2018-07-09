import React, { Component } from 'react';
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

	render() {

		return(
			<form>
				<Textfield onChange={this.handleTextFieldChange}
						   multiline={true}
						   placeholder="Input..."
						   className="inputField"
						   InputProps={{disableUnderline: true}}/>

				<Button className="sendButton"
						variant="contained"
						color="primary" onClick={() => this.props.sendMessage(this.state.input, this.props.nickname)}>
					Send
				</Button>
			</form>
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
