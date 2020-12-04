import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import analyze from 'rgbaster'


import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Card, ThemeProvider } from '@material-ui/core/';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import { createMuiTheme } from '@material-ui/core/';
import { CssBaseline } from '@material-ui/core/';

import AirBnBCereal from '../assets/AirbnbCerealExtraBold.ttf'
import Header2 from '../components/Header2';
import MediaCard from '../components/ShowCard';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    bar: {
        margin: 1,
    },
    center: {
        display: "flex",
        alignItems: "center"
    },
    container: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '360px',
        justifyContent: 'center',
        left: '50%',
        outline: 'none',
        position: 'absolute',
        textAlign: 'center',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%'
    }
});
class DetailPage extends Component {


    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header2 />
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={""}
                            title={"Titulo"}
                        />
                        <CardContent>
                            <Typography variant="h5" className={classes.title} color="textSecondary" gutterBottom>
                                Titulo
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Tipo
                        </Button>
                        <Button size="small" color="primary">
                            More...
                    </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}


export default
    withStyles(styles)(DetailPage);