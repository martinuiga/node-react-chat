import React from 'react';
import Grid from '@material-ui/core/Grid'

import Message from './Message/Message';

const Messages = (props) => {
	return (
		<Grid item container
			direction='column-reverse'
			spacing={16}
			xs={12}>
			{/* Hardcoded placeholder */}
			<Message message="Cool stuff 1" justify='flex-end' color='primary' />
			<Message message="Cool stuff 2" justify='flex-start' />
			<Message message="Cool stuff 3" justify='flex-end' color='primary' />
			<Message message="Cool stuff 4" justify='flex-start' />
		</Grid>
	);

};

export default Messages;