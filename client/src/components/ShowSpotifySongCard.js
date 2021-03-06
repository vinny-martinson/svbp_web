import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
import PodcastCover from '../assets/spotify_podcasts_cover.png';

import AirBnBCereal from '../assets/AirbnbCerealExtraBold.ttf'
import { addSong } from '../actions/mediaActions';

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



function MediaCard(props) {
    const classes = useStyles();
    const {
        media,
        dispatch
    } = props;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={media.album.images[0].url}
                        title={media.name}
                    />
                    <CardContent>
                        <Typography variant="h5" className={classes.title} color="textSecondary" gutterBottom>
                            {`${media.name} by ${media.artists[0].name}`} 
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Song
                    </Button>
                    <Link onClick={() => window.location.href = `/song?media_id=${media.id}`}
                    to={{
                        pathname: `/song?media_id=${media.id}`,
                        state: {
                            media: media
                        }
                    }}>
                    <Button 
                        size="small" 
                        color="primary" 
                        onClick={() => {
                            console.log("clicked");
                            dispatch(addSong(media));
                        }}>
                        More...
                    </Button>
                    </Link>
                </CardActions> 
            </Card>
        </ThemeProvider>
    );
}

MediaCard.propTypes = {
    dispatch: PropTypes.func.isRequired,
    media: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
    addSong: media => dispatch(addSong(media)),
});

export default 
    connect(
        mapDispatchToProps
    )
(MediaCard);