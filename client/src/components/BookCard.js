import React from 'react';
import { Link } from 'react-router-dom';
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

import AirBnBCereal from '../assets/AirbnbCerealExtraBold.ttf'
import { addBook } from '../actions/mediaActions';
import Loading from '../components/Loading';

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



function BookCard(props) {
    const classes = useStyles();
    const {
        media,
        dispatch
    } = props;

    console.log(media);

    return (
        (media) ?
            (<ThemeProvider theme={theme}>
                <CssBaseline />
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={((media.imageLinks === undefined) ? "https://www.virago.co.uk/wp-content/uploads/2018/07/missingbook.png"
                                : media.imageLinks.thumbnail)
                            }
                            title={media.title}
                        />
                        <CardContent>
                            <Typography variant="h5" className={classes.title} color="textSecondary" gutterBottom>
                                {media.title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            {media.printType}
                        </Button>
                        {(
                            (media.industryIdentifiers[0].identifier) ?
                                (<Link onClick={() => window.location.href = `/book?media_id=${media.industryIdentifiers[0].identifier}`}
                                    to={{
                                        pathname: `/book?media_id=${media.industryIdentifiers[0].identifier}`,
                                        state: {
                                            media: media
                                        }
                                    }}>
                                        <Button
                                        size="small"
                                        color="primary"
                                        onClick={() => {
                                            console.log("clicked");
                                            dispatch(addBook(media));
                                        }}>
                                        More...
                                        </Button>
                                </Link>)
                                : 
                                (<Button
                                    size="small"
                                    color="primary"
                                >
                                    More...
                                    </Button>)
                        )}

                                    
                </CardActions>
                </Card>
            </ThemeProvider>
            ) : (<Loading />));
}

BookCard.propTypes = {
    dispatch: PropTypes.func.isRequired,
    media: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
    addBook: media => dispatch(addBook(media)),
});

export default
    connect(
        mapDispatchToProps
    )
        (BookCard);