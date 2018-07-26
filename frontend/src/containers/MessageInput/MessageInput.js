import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Textfield from '@material-ui/core/TextField';
import { connect } from "react-redux";
import {isTyping, sendMessage} from "../../store/actions/chat";
import { withStyles } from '@material-ui/core/styles';
import styles from './MessageInputStyles';
import { compose } from 'redux';


class MessageInput extends Component {
	state = {
		input: ""
	};

	handleTextFieldChange = (e, submitObj) => {
		console.log(e);
		console.log(submitObj);
		this.setState({
			input: e.target.value
		});
		// TODO make this work
		if (e.keyCode === 13) {
			this.handleOnClick(submitObj.input, submitObj.nickname, submitObj.id);
		}
		if(e.target.value) {
			this.props.isTyping(this.props.nickname, this.props.id, true);
		} else {
			this.props.isTyping(this.props.nickname, this.props.id, false);
		}
	};

	handleOnClick = (message, nickname, userId) => {
		this.props.sendMessage(message, nickname, userId);
		this.setState({
			input: ""
		});
		this.props.isTyping(this.props.nickname, this.props.id, false);
	};

	render() {
		const { classes } = this.props;
		return(
			<form>
				<Textfield onChange={(e) => this.handleTextFieldChange(e, { // variable 'e' is not sent correctly
					input: this.state.input,
					nickname: this.props.nickname,
					id: this.props.id
				})}
						   multiline={true}
						   placeholder="Input..."
						   value={this.state.input}
						   className={classes.inputField}
						   InputProps={{disableUnderline: true}}
				/>

				<Button className={classes.sendButton}
						variant="contained"
						color="primary" onClick={() => this.handleOnClick(this.state.input, this.props.nickname, this.props.id)}>
					Send
				</Button>
			</form>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		nickname: state.user.nickname,
		id: state.user.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		sendMessage: (message, nickname, id) => {
			dispatch(sendMessage(message, nickname, id))
		},
		isTyping: (nickname, id, typing) => {
			dispatch(isTyping(nickname, id, typing))
		}
	}
};

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps
	))(MessageInput);
