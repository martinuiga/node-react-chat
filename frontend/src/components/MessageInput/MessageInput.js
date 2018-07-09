import React from 'react';
import Button from '@material-ui/core/Button';
import Textfield from '@material-ui/core/TextField';

import './MessageInput.css';

const MessageInput = () => (
	<form>
		<Textfield
			multiline={true}
			placeholder="Input..."
			className="inputField" 
			InputProps={{ disableUnderline: true }}/>

		<Button className="sendButton"
			variant="contained"
			color="primary" >
			Send
		</Button>
	</form>
);

export default MessageInput;
