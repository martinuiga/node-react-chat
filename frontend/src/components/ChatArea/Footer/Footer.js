import React from 'react';
import Typography from '@material-ui/core/Typography';

const Footer = (props) => {
    let text = "";
    if (props.users.length > 1) {
        text = "are";
    } else {
        text = "is";
    }
    return (
        <Typography variant="caption" align="center" color="default">
            {props.users.join(", ")} {text} typing
        </Typography>
    );
};

export default Footer;
