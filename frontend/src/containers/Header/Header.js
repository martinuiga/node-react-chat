import React, { Component } from 'react';
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Connected from '@material-ui/icons/SignalWifi4Bar';
import Disconnected from "@material-ui/icons/SignalWifiOff"
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import AppBar from "@material-ui/core/es/AppBar/AppBar";

class Header extends Component {
	render() {
		let connection = null;
		if (!this.props.connection) {
			connection = <Disconnected style={{color: red[500]}}/>;
		} else {
			connection = <Connected style={{color: green[700]}}/>;
		}
		return (
			<AppBar>
				<Toolbar>
					<IconButton color="inherit" aria-label="Menu">
						{connection}
					</IconButton>
				</Toolbar>
			</AppBar>
		);
	}
}

export default Header;
