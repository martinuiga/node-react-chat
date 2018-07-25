const styles = theme => ({
	paper: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
	},
	messageArea: {
		height: '74vh',
		overflowY: 'scroll',
	},
	typingArea: {
		height: 15
	},
	messageInputArea: {
		marginTop: 15
	}
});

export default styles;
