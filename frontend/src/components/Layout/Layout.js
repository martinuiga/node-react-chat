import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { styles } from './LayoutStyles';
import logo from '../../resources/images/logo.svg'

const Layout = (props) => {
    const { classes } = props;

    return (
        <Fragment>
            <AppBar position="static" color="default">
                <Toolbar className={classes.header}> 
                {/* Placeholders */}
                    <img alt="" src={logo} width="80" height="80"/> 
                    <Typography variant="title" color="inherit">
                        WebChat
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.root}>
                <Grid container spacing={16}>
                    <Grid item xs={3}>
                        {/* Placeholder */}
                        <Paper className={classes.paper}>SideMenu</Paper>
                    </Grid>
                    <Grid item xs={9}>
                        {/* Placeholder */}
                        <Paper className={classes.paper}>ChattingArea</Paper>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
    
};

export default withStyles(styles)(Layout) ;