const styles = theme => ({
	paper: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
	},
	messageArea: {
		height: '79vh',
		overflowY: 'scroll',
	},
	test: {
		//height: '100%'
	}
});

export default styles;
