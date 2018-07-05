export const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: 20,
        height: '90vh' //hardcoded for now, css be hard (flexGrow??)
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
});