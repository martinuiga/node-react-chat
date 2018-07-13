import React from 'react';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

import { styles1 } from './SnackbarStyles';

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
};

const SnackbarWrapper = (props) => {
	const { classes, className, message, onClose, variant, ...other } = props;
	const Icon = variantIcon[variant.toLowerCase()];

	// variant.toLowerCase() only works without errors when applying it straight where it is used...
	return (
		<SnackbarContent
			className={classNames(classes[variant.toLowerCase()], className)}
			aria-describedby="message-snackbar"
			message={
				<span id="message-snackbar" className={classes.message}>
					<Icon className={classNames(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
			action={[
				<IconButton
					key="close"
					aria-label="Close"
					color="inherit"
					className={classes.close}
					onClick={onClose}
				>
					<CloseIcon className={classes.icon} />
				</IconButton>,
			]}
			{...other}
		/>
	);
}

export default withStyles(styles1)(SnackbarWrapper);
