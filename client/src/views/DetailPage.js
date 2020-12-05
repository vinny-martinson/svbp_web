import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import analyze from 'rgbaster'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib

import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AssignmentIcon from '@material-ui/icons/Assignment';

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
import Modal from '@material-ui/core/Modal';
import { createMuiTheme } from '@material-ui/core/';
import { CssBaseline } from '@material-ui/core/';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Rating from '@material-ui/lab/Rating';

import AirBnBCereal from '../assets/AirbnbCerealExtraBold.ttf'
import Header2 from '../components/Header2';
import MediaCard from '../components/ShowCard';
import PostFeed from '../components/PostFeed';
import Loading from '../components/Loading';
import { getMedia, updateMediaLikes } from '../actions/mediaActions';
import { getFollowers, getFollowing, getUser } from '../actions/userActions';
import { createReview } from '../actions/postsActions';

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
    modalPaper: {
        position: 'absolute',
        alignItems: 'center',
        width: theme.spacing.unit * 70,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: '50%',
        left: '50%',
        outline: 'none',
        transform: 'translate(-50%, -50%)'
    },
    image: {
        maxWidth: "100%",
        maxHeight: "100%",
        borderRadius: "10px"
    },
    card: {
        margin: '20px auto',
        width: '95%'
      },
    divImg: {
        position: "absolute",
        width: "300px",
        top: "-5%",
        left: "10%",
        height: "120%"
    },
    title: {
        marginTop: "1.5rem",
        top: "2rem",
        position: "relative",
        fontSize: 36,
        color: "#FFFFFF",
        left: 'calc(9% + 300px)'
    },
    activity: {
        textAlign: "center",
        top: "25%",
        marginTop: "3rem",
        fontSize: 36,
        color: "#2138A0",
        left: "10%"
    },
    logTitle: {
        textAlign: "center",
        fontSize: 20,
        color: "#2138A0",
    },
    subtitle: {
        marginTop: "1.5rem",
        top: "0.5rem",
        position: "relative",
        fontSize: 19,
        color: "#FFFFFF",
        left: 'calc(9% + 300px)'

    },
    plot: {
        position: "relative",
        fontSize: 14,
        top: "1rem",
        color: "#FFFFFF",
        left: 'calc(9% + 300px)',
        maxWidth: "40%"

    },
    bar: {
        margin: 1,
    },
    center: {
        display: "flex",
        alignItems: "center"
    },
    type: {
        position: "relative",
        top: "1.1 rem",
        left: 'calc(9% + 300px)',
        backgroundColor: 'rgba(254, 224, 90, 1)'
    },
    log: {
        position: "relative",
        top: "1rem",
        left: 'calc(20% + 300px)',
        backgroundColor: 'rgba(255, 125, 99, 1)'
    },
    like: {
        position: "relative",
        top: "1rem",
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
    },
    ratings: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
});

class DetailPage extends Component {

    state = {
        loading: true,
        medium: [],
        details: [],
        modalOpen: false,
        selectedDate: new Date(),
        rating: 0,
        review: ''
    };

    async componentDidMount() {
        try {
            const {
                retrieveUser
            } = this.props;

            this.setState({ loading: true });
            const media = this.props.location.state.media;

            const res = await axios(
                `http://www.omdbapi.com/?i=${media.imdbID}&apikey=81c75ea2`
            );
            const result = await res.data;
            this.setState({ details: result });

            const response = await server.get(`/api/web/av/get/${result.imdbID}`);

            const resultado = await response.data.medium;
            this.setState({
                medium: resultado,
                loading: false
            });

        }
        catch (err) {
            console.log(err);
        }
    }

    async updateLikes(action, postId, likerId) {
        const likes = await server.patch(`/api/web/av/edit/${postId}`, { action, id: likerId });
        this.setState({ medium: likes.data })

    };

    handleModalOpen = () => {
        this.setState({ modalOpen: true });
    };

    handleModalClose = () => {
        this.setState({ modalOpen: false });
    };

    handleDateChange = (date) => {
        this.setState({ selectedDate: date })
    }

    handleRatingChange = (e) => {
        this.setState({ rating: e.target.value });

    }

    handleReviewChange = (e) => {
        this.setState({ review: e.target.value });

    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state.review);
        //console.log(this.state.rating);
        //console.log(this.state.selectedDate);
        //console.log(this.props.usuario);
        // console.log(this.state.medium)
        const dispatch = this.props.dispatch;

        dispatch(createReview(
            this.state.review,
            this.props.usuario,
            this.state.selectedDate,
            this.state.rating,
            this.state.medium
        ));
        this.setState({ review: '', rating: 0, selectedDate: new Date() })
        this.handleModalClose();
    }

    dateFormatter = str => {
        return str;
    };


    render() {
        const {
            classes,
            usuario
        } = this.props;

        const media = this.props.location.state.media;
        const {
            loading,
            medium,
            details,
            modalOpen,
            selectedDate,
            rating,
            review,
            inputValue
        } = this.state;

        console.log(medium);


        return (
            loading ? (
                <div>
                    <Header2 />
                    <Loading />
                </div>
            ) : (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                                        <Button
                                            startIcon={<AssignmentIcon />}
                                            variant="contained"
                                            size="small"
                                            className={classes.log}
                                            onClick={this.handleModalOpen}
                                        >
                                            Log
                            </Button>
                                        <Button
                                            startIcon={
                                                (medium.likers.includes(usuario.user_info.id)) ? <FavoriteIcon /> : <FavoriteBorderIcon />
                                            }
                                            variant="contained"
                                            size="small"
                                            // style={
                                            //     (medium.likers.includes(usuario.user_info.id)) ? { backgroundColor: '#ffffff' } : null
                                            // }
                                            className={classes.like}
                                            onClick={() => {
                                                (medium.likers.includes(usuario.user_info.id)
                                                    ? this.updateLikes('unlike', medium.imdbID, usuario.user_info.id)
                                                    : this.updateLikes('like', medium.imdbID, usuario.user_info.id))
                                            }}
                                            aria-label="Like"
                                        >
                                            Like
                            </Button>
                                    </div>
                                    <Grid container spacing={3} alignItems="flex-start" justify="center" style={{ paddingTop: "4.5rem" }}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h5" className={classes.activity} color="#2138A0" gutterBottom>
                                                My Activity
                                            </Typography>
                                        <PostFeed onDetailPage={false} onMyActivity={true} medium={medium} />
                                        </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="h5" className={classes.activity} color="#2138A0" gutterBottom>
                                                    Users Activity
                                        </Typography>
                                                <PostFeed onDetailPage={true} medium={medium} />

                                            </Grid>
                                        </Grid>

                                        <div style={{ marginTop: "150px" }}>
                                            {/* Likers {medium.likesCount} */}
                                        </div>
                                </div>

                                    <Modal
                                        aria-labelledby="modal-title"
                                        aria-describedby="modal-description"
                                        open={modalOpen}
                                        onClose={this.handleModalClose}
                                    >
                                        <div className={classes.modalPaper}>
                                            <form
                                                className={classes.formContainer}
                                                autoComplete="off"
                                                onSubmit={this.handleOnSubmit}
                                            >
                                                <Typography
                                                    variant="h5"
                                                    className={classes.logTitle}
                                                >
                                                    Log {media.Type}
                                                </Typography>

                                                <Rating
                                                    name="half-rating"
                                                    style={{ alignSelf: "center" }}
                                                    size="large"
                                                    label="Rating"
                                                    defaultValue={0}
                                                    precision={0.5}
                                                    onChange={this.handleRatingChange}
                                                    //value={rating}
                                                    id="rating"
                                                />

                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    fullWidth
                                                    style={{ position: "relative" }}
                                                    showTodayButton={true}
                                                    variant="inline"
                                                    format="MM-dd-yyyy"
                                                    margin="normal"
                                                    id="date"
                                                    name="date"
                                                    label="Date Watched"
                                                    value={selectedDate}
                                                    inputValue={inputValue}
                                                    onChange={this.handleDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />


                                                <TextField
                                                    fullWidth
                                                    required
                                                    className={classes.textField}
                                                    multiline
                                                    rows={6}
                                                    // defaultValue={signedInUser.username}
                                                    id="review"
                                                    label="Review"
                                                    margin="normal"
                                                    name="review"
                                                    onChange={this.handleReviewChange}
                                                    placeholder="What are your thoughts?"
                                                />

                                                <Button
                                                    fullWidth
                                                    color="primary"
                                                    className={classes.saveButton}
                                                    type="submit"
                                                    variant="contained"
                                                >
                                                    Post
                                </Button>
                                            </form>
                                        </div>
                                    </Modal>
                                </div>
                        </ThemeProvider>
                    </MuiPickersUtilsProvider>
                )
        );
    }
}

DetailPage.propTypes = {
                            dispatch: PropTypes.func.isRequired,
    usuario: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
                            usuario: state.authReducer.user
});


export default
    compose(
        withStyles(styles),
        connect(mapStateToProps)
    )(DetailPage);