export const styles = theme => ({
	messageBg: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
	},
	primary: {
		background: theme.palette.primary.main
	},
	primaryTyp: {
		color: theme.palette.getContrastText(theme.palette.primary.main)
	}
});

export default styles