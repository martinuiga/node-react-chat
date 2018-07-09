import React from 'react';
import Grid from '@material-ui/core/Grid'

import Message from './Message/Message';

const Messages = (props) => {
	return (
		<Grid item container
			direction='row-reverse'
			spacing={16}
			xs={12}>
			{/* Hardcoded placeholder */}
			<Grid item xs={12} ><Message message="Cool stuff 24" justify='flex-end' color='primary' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 23" justify='flex-start' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 22" justify='flex-end' color='primary' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 21" justify='flex-start' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 20" justify='flex-end' color='primary' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 19" justify='flex-start' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 18" justify='flex-end' color='primary' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 17" justify='flex-start' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 16" justify='flex-end' color='primary' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 15" justify='flex-start' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 14" justify='flex-end' color='primary' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 13" justify='flex-start' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 12" justify='flex-end' color='primary' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 11" justify='flex-start' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 10" justify='flex-end' color='primary' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 9" justify='flex-start' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 8" justify='flex-end' color='primary' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 7" justify='flex-start' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 6" justify='flex-end' color='primary' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 5" justify='flex-start' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 4" justify='flex-end' color='primary' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 3" justify='flex-start' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 2" justify='flex-end' color='primary' /></Grid>
			<Grid item xs={12} ><Message message="Cool stuff 1" justify='flex-start' /></Grid>
		</Grid>
	);
};

export default Messages;
