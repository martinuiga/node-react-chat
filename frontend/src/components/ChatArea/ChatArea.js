import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Messages from './Messages/Messages';

const styles = theme => ({
    messageArea: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    placeHolder: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
});

const ChatArea = (props) => {
    const { classes } = props;

    return (
        <Grid container direction='column' spacing={8}>
            <Grid item xs={12}>
                <Header users={props.users} room={props.room} />
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.messageArea}>
                    <Messages />
                    <Footer users={props.users} />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.placeHolder}>
                    PlaceHoler
                </Paper>
            </Grid>
        </Grid>
        
    );
};

export default withStyles(styles)(ChatArea);