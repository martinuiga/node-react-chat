import React from 'react';
import Grid from '@material-ui/core/Grid'

import Message from './Message/Message';

const Messages = (props) => {
	return (
		<Grid item container
			direction='row-reverse'
			alignItems='flex-end'
			justify='flex-end'
			spacing={16}
			xs={12}>
			{/* Hardcoded placeholder */}
			<Grid item xs={12} ><Message owner="Vello" message="Cool stuff 24" justify='flex-end' color='primary' /></Grid>
			<Grid item xs={12} ><Message owner="Vello" message="Cool stuff 23" justify='flex-start' /></Grid>
			<Grid item xs={12} ><Message owner="Vello" message="Cool stuff 22" justify='flex-end' color='primary' /></Grid>
			<Grid item xs={12} ><Message owner="Vello" message="Cool stuff 21" justify='flex-start' /></Grid>
			<Grid item xs={12} ><Message owner="Vello" message="Cool stuff 20" justify='flex-end' color='primary' /></Grid>
			<Grid item xs={12} ><Message owner="Vello" message="Cool stuff 19" justify='flex-start' /></Grid>
			<Grid item xs={12} ><Message owner="Vello" message="Cool stuff 18" justify='flex-end' color='primary' /></Grid>
			<Grid item xs={12} ><Message owner="Vello" message="Cool stuff 17" justify='flex-start' /></Grid>
			<Grid item xs={12} ><Message owner="Vello" message="Cool stuff 16" justify='flex-end' color='primary' /></Grid>



		</Grid>
	);
};

export default Messages;
