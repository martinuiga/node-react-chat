import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
});

const Messages = (props) => {
    const { classes } = props;

    return (
        <Grid container direction='column' spacing={16} alignItems='center'>
            <Grid item container alignItems='flex-end'>
                <Paper className={classes.root}>
                    <Typography component="p">A cool message</Typography>
                </Paper>
            </Grid>
            <Grid item>
                <Paper className={classes.root}>
                    <Typography component="p">A cool message</Typography>
                </Paper>
            </Grid>
            <Grid item>
                <Paper className={classes.root}>
                    <Typography component="p">A cool message</Typography>
                </Paper>
            </Grid>
            <Grid item>
                <Paper className={classes.root}>
                    <Typography component="p">A cool message</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
    
};

export default withStyles(styles)(Messages);