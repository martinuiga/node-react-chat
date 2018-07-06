import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import logo from '../../resources/images/logo.svg'

const Header = () => (
	<AppBar
		position="static"
		color="primary">
		<Toolbar>
			{/* Placeholders */}
			<img alt="" src={logo} width="80" height="80" />
			<Typography variant="title" color="inherit">
				WebChat
            </Typography>
		</Toolbar>
	</AppBar>
);

export default Header;