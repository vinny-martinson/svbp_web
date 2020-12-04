import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, ThemeProvider } from '@material-ui/core/';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/';
import { CssBaseline } from '@material-ui/core/';

import AirBnBCereal from '../assets/AirbnbCerealExtraBold.ttf'


const theme = createMuiTheme({
    typography: {
        fontFamily: ['Montserrat'].join(','),
        h5: {
            "fontWeight": 700,
        },
        h6: {
            "fontWeight": 400,
        },
    }
});

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    title: {
        fontSize: 14,
        color: "#2138A0",
    },
});

export default function MediaCard(props) {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.poster}
                        title={props.title}
                    />
                    <CardContent>
                        <Typography variant="h5" className={classes.title} color="textSecondary" gutterBottom>
                            {props.title} ({props.year})
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        {props.type}
                    </Button>
                    <Button size="small" color="primary">
                        More...
                    </Button>
                </CardActions> 
            </Card>
        </ThemeProvider>
    );
}