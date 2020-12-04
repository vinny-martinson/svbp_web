import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import analyze from 'rgbaster'

import IconButton from '@material-ui/core/IconButton';
import LikeIcon from '@material-ui/icons/ThumbUp';
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
import Loading from '../components/Loading';
import { getMedia } from '../actions/mediaActions';

const server = axios.create({
    baseURL: 'http://localhost:3001'
  })

const theme = createMuiTheme({
    typography: {
        fontFamily: ['Montserrat'].join(','),
        h5: {
            "fontWeight": 800,
        },
        h6: {
            "fontWeight": 400,
        },
    }
});

const styles = theme => ({
    root: {
        marginTop: "3%",
        flexGrow: 1,
        height: "300px",
        position: "relative",
        background: 'linear-gradient(180deg, #4D5D75 0%, #8591A6 100%)'
    },
    image: {
        maxWidth: "100%",
        maxHeight: "100%",
        borderRadius: "10px"
    },
    divImg: {
        position: "absolute",
        width: "300px",
        top: "-5%",
        left: "10%",
        height: "120%"
    },
    title: {
        position: "absolute",
        fontSize: 36,
        color: "#FFFFFF",
        left: 'calc(9% + 300px)'
    },
    subtitle: {
        position: "absolute",
        fontSize: 19,
        top: "40px",
        color: "#FFFFFF",
        left: 'calc(9% + 300px)'

    },
    plot: {
        position: "absolute",
        //fontSize: 19,
        top: "110px",
        color: "#FFFFFF",
        left: 'calc(9% + 300px)'

    },
    bar: {
        margin: 1,
    },
    center: {
        display: "flex",
        alignItems: "center"
    },
    type: {
        position: "absolute",
        top: "70px",
        left: 'calc(9% + 300px)',
        backgroundColor: 'rgba(254, 224, 90, 1)'
    },
    log: {
        position: "absolute",
        top: "250px",
        left: 'calc(20% + 300px)',
        backgroundColor: 'rgba(255, 125, 99, 1)'
    },
    like: {
        position: "absolute",
        top: "250px",
        left: 'calc(28% + 350px)',
        backgroundColor: 'rgba(255, 125, 99, 1)'
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

    state = {
        loading: true,
        medium:[],
        details: []
    };

    async componentDidMount() {
        try {
            this.setState({ loading: true });
            const media = this.props.location.state.media;
            //console.log(media.imdbID)

            const res = await axios(
                `http://www.omdbapi.com/?i=${media.imdbID}&apikey=81c75ea2`
            );
            const result = await res.data;
            // console.log(result);
            this.setState({ details: result, loading: false });

            const response = await server.get(`/api/web/av/get/${result.imdbID}`);
            const resultado = await response.data;
            this.setState({ medium: resultado });

        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        const { classes } = this.props;
        const media = this.props.location.state.media;
        const {details, medium} = this.state;
        console.log(medium);
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div>
                    <Header2 />
                    <div>
                        <div className={classes.root}>
                            <div className={classes.divImg}>
                                <img className={classes.image}
                                    src={media.Poster} />
                            </div>
                            <Typography variant="h5" className={classes.title} color="textSecondary" gutterBottom>
                                {media.Title.toUpperCase()}
                            </Typography>
                            <Typography variant="h6" className={classes.subtitle} color="textSecondary" gutterBottom>
                                Directed by {details.Director}
                            </Typography>
                            <Button variant="contained" size="small" className={classes.type}>
                                {media.Type}
                            </Button>
                            <Typography variant="body1" className={classes.plot} color="textSecondary" gutterBottom>
                                {details.Plot}
                            </Typography>
                            <Button variant="contained" size="small" className={classes.log}>
                                Log
                            </Button>
                            <Button variant="contained" size="small" className={classes.like}>
                                Like
                            </Button>
                        </div>
                        <div style={{marginTop: "250px"}}>
                            {/* <IconButton
                                onClick={() =>
                                    (likers.includes(signedInUserId)
                                        ? updatePostLikes('unlike', _id, signedInUserId)
                                        : updatePostLikes('like', _id, signedInUserId))
                                }
                                aria-label="Like"
                            >
                                <LikeIcon
                                    style={
                                        likers.includes(signedInUserId) ? { color: '#3f51b5' } : null
                                    }
                                />
                            </IconButton> */}
                            Likers {medium.likesCount}
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

DetailPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    getMedia: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    getMedia: imdbID => dispatch(getMedia(imdbID)),
});

export default
compose(
    withStyles(styles),
    connect(null, mapDispatchToProps)
  )(DetailPage);