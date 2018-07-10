import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Footer = (props) => {
	let text = "";
	if (props.users.length > 1) {
		text = "are";
	} else {
		text = "is";
	}
	return (
		<Grid item>
			<Typography
				variant="caption"
				align="center"
				color="default">
				{props.users.join(", ")} {text} typing
        	</Typography>
		</Grid>
	);
};

export default Footer;
