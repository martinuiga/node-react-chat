import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Footer = (props) => {
	let text = "";
	if (props.users.length > 1) {
		text = 'are typing';
	} else if (props.users.length === 1 ){
		text = "is typing";
	} else {
		text = ""
	}
	return (
		<Grid item>
			<Typography
				variant="caption"
				align="center"
				color="default">
				{/* If there are too many users to fit in the component, then will have to wrap */}
				{/* Maybe will lose the text and do the typing with "..." bubbles or sth else */}
				{props.users.join(", ")} {text}
        	</Typography>
		</Grid>
	);
};

export default Footer;
