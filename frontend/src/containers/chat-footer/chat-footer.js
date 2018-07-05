import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Textfield from '@material-ui/core/TextField';
import './chat-footer.css';

class Chatfooter extends Component {
	render () {
		return (
			<form>
				<Textfield
					multiline={true}
					placeholder="Input..."
					className="inputField"/>

				<Button className="sendButton"
						variant="contained"
						color="primary" >
					Send
				</Button>
			</form>
		);
	}
}


export default Chatfooter;
