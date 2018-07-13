import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
	close: {
		width: theme.spacing.unit * 4,
		height: theme.spacing.unit * 4,
	},
});

const SimpleSnackbar = (props) => {
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
				ContentProps={{
					'aria-describedby': 'message-id',
				}}
				message={<span id="message-id">{props.severity}:{props.message}</span>}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						className={classes.close}
						onClick={props.close}
					>
						<CloseIcon />
					</IconButton>,
				]}
			/>
		</div>
	);
}


export default withStyles(styles)(SimpleSnackbar);
