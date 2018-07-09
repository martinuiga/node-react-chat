export const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: 20,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	drawerPaper: {
		position: 'relative',
		height: 'calc(100vh - 120px)'
	}
});
