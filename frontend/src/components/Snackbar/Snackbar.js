import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';

import { styles2 } from './SnackbarStyles';
import SnackBarWrapper from './SnackBarWrapper';

const SnackbarMsg = (props) => {
	const { classes } = props;

	return (
		<div>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={props.open}
				autoHideDuration={6000}
				onClose={props.close}
			>
				<SnackBarWrapper
					variant={props.severity}
					className={classes.margin}
					message={props.message}
					onClose={props.close}
				/>
			</Snackbar>
		</div>
	);
}

export default withStyles(styles2)(SnackbarMsg);
