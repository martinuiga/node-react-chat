import React, { Fragment } from 'react';
import TextField from "@material-ui/core/es/TextField/TextField";

const Example = (props) => {
	if (!props.message) return null; // fail first

	return (
		<Fragment>
			<h1>{props.message}</h1>
			<TextField
				id="returnMessage"
				label="returnMessage"
				onChange={(e) => {
					console.log(e);
					props.response(e.target.value);
				}}
				margin="normal"
			/>
		</Fragment>
	)
};

export default Example;
