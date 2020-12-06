import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Header2 from '../components/Header2';
import MediaCard from '../components/ShowSpotifyPodcastCard';
import { createMuiTheme } from '@material-ui/core/';
import { CssBaseline } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import AirBnBCereal from '../assets/AirbnbCerealExtraBold.ttf'

const code = localStorage.getItem('spotify_token');

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
        flexGrow: 1,
    },
    bar: {
        margin: 1,
    },
    refresh_button: {
        marginRight: "5%"
    },
    center: {
        display: "flex",
        alignItems: "center"
    },
    title: {
        textAlign: "center",
        marginTop: "2rem",
        fontSize: 36,
        color: "#2138A0",
        left: "10%"
    },
});
class SearchPage extends Component {
    state = {
        search: null,
        loading: false,
        value: '',
        open: false,
        openDialog: false,
    };

    search = async val => {

        this.setState({ loading: true });
        // MUST BE HTTP(S)
        const res = await axios(
            'http://localhost:3001/api/web/spotify/search?code=' + code + '&media=' + val + '&type=show'
        );
        const result = await res.data.body.shows;
        console.log(result);
        this.setState({ search: result, loading: false });
    };

    componentDidMount = () => {
        if (!localStorage.spotify_token) {
            this.setState({ openDialog: true });
        }
    };

    onChangeHandler = async e => {
        this.search(e.target.value);
        this.setState({ value: e.target.value });
    };

    handleClose = () => {
        this.setState({ openDialog: false });
    };

    render() {
        const { classes, getSearch } = this.props;
        return (this.state.openDialog ? (
            <div>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Header2 />
                    <Typography variant="h5" className={classes.title} color="#2138A0" gutterBottom>
                        {"Podcasts"}
                    </Typography>
                    <div className={classes.center}>
                        <TextField
                            disabled
                            style={{
                                marginLeft: "3%",
                                marginRight: "3%",
                                marginTop: "1%"
                            }}
                            className={classes.bar}
                            value={this.state.value}
                            fullWidth
                            InputAdornment="Icon"
                            label="Search Podcasts in Spotify" variant="filled"
                            onChange={e => this.onChangeHandler(e)}
                            placeholder="Search..."
                        />
                    </div>
                    <Dialog
                        open={this.state.openDialog}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Connect to Spotify?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                In order to use this feature you must connect Spotify to your Meedien account.
                    </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Go Back
                        </Button>
                            <Button
                                href="http://localhost:3001/api/web/spotify/auth"
                                variant="contained"
                                color="primary"
                                className={classes.refresh_button}
                            >
                                Connect to Spotify
                </Button>
                        </DialogActions>
                    </Dialog>
                </ThemeProvider>
            </div>
        ) : (
                <div>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Header2 />
                        <Typography variant="h5" className={classes.title} color="#2138A0" gutterBottom>
                            {"Podcasts"}
                        </Typography>
                        <div className={classes.center}>
                            <TextField
                                style={{
                                    marginLeft: "3%",
                                    marginRight: "3%",
                                    marginTop: "1%"
                                }}
                                className={classes.bar}
                                value={this.state.value}
                                fullWidth
                                InputAdornment="Icon"
                                label="Search Podcasts in Spotify" variant="filled"
                                onChange={e => this.onChangeHandler(e)}
                                placeholder="Search..."
                            />

                        </div>
                        <Grid
                            container
                            spacing={3}
                            justify="space-evenly"
                            alignItems="stretch"
                            style={{
                                marginTop: "1%",
                                margin: "1% !important"
                            }}
                        >

                            {this.state.search ? (this.state.search.items.map((show) =>
                                <Grid item xs={3}>
                                    <MediaCard
                                        // title={show.Title}
                                        // year={show.Year}
                                        // poster={show.Poster}
                                        // type={show.Type}
                                        media={show}
                                    />
                                </Grid>
                            )) : console.log("empty")}

                        </Grid>
                    </ThemeProvider>
                </div>
            ));
    }
}

SearchPage.propTypes = {
    classes: PropTypes.object.isRequired,
    getSearch: PropTypes.func.isRequired
}


const mapDispatchToProps = dispatch => ({
});

export default compose(
    withStyles(styles),
    connect(
        mapDispatchToProps
    )
)(SearchPage);