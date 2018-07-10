import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';

const Modal = (props) => {
	const { fullScreen } = props;

	return (
		<div>
			<Dialog
				fullScreen={fullScreen}
				open={props.open}
				onClose={props.close}
				aria-labelledby="modal">
				<DialogTitle
					id="modal">
					{props.text}
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label={props.label}
						type="text"
						fullWidth
						onChange={props.change}
						error={props.error}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={props.submit}
						color="primary"
						autoFocus>
						Submit
            			</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default withMobileDialog()(Modal);