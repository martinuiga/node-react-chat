import React, { Component, Fragment } from 'react';

class Layout extends Component {
	render() {
		return (
			<Fragment>
				<main style={{marginTop: "100px"}}>
					{this.props.children}
				</main>
			</Fragment>
		)
	}
}

export default Layout;
