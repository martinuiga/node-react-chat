import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const Header = () => (
	<AppBar
		position="static"
		color="primary">
		<Toolbar>
			{/* Placeholders */}
			<img alt="" src="https://png.pngtree.com/element_pic/00/16/07/1457866c6164a5b.jpg" width="80" height="80" />
			<Typography variant="title" color="inherit">
				WebChat
            </Typography>
		</Toolbar>
	</AppBar>
);

export default Header;