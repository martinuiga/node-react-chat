import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = (props) => (
	<AppBar
		position="static"
		color="default">
		<Toolbar>
			<Typography
				variant="headline"
				color="default">
				{/* If there are too many users to fit in the component, then will have to wrap */}
				{props.users.join(", ")} {props.room === "" ? "" : "in"} {props.room}
			</Typography>
		</Toolbar>
	</AppBar>
);

export default Header;
