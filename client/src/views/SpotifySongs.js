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
import SongCard from '../components/ShowSpotifySongCard';
import Button from '@material-ui/core/Button';

const code = localStorage.getItem('spotify_token')
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    bar: {
        margin: 1,
    },
    refresh_button : {
        marginRight: "5%"
    },
    center: {
        display: "flex",
        alignItems: "center"
    }
});
class SearchPage extends Component {
    state = {
        search: null,
        loading: false,
        value: '',
        open: false
    };

    search = async val => {

        this.setState({ loading: true });
        // MUST BE HTTP(S)
        const res = await axios(
            'http://localhost:3001/api/web/spotify/search?code=' + code + '&media=' + val + '&type=track'
        );
        console.log('=> tracks', res)
        const result = await res.data.body.tracks;
        // console.log(result);
        this.setState({ search: result, loading: false });
    };

    onChangeHandler = async e => {
        this.search(e.target.value);
        this.setState({ value: e.target.value });
    };

    render() {
        const { classes, getSearch } = this.props;
        return (
            <div>
                <Header2 />
                <div className={classes.center}>
                <TextField
                    style= {{   marginLeft: "3%",
                                marginRight: "3%",
                                marginTop: "1%"
                            }}
                    className={classes.bar}
                    value={this.state.value}
                    fullWidth
                    InputAdornment="Icon"
                    label="Search Songs in Spotify" variant="filled"
                    onChange={e => this.onChangeHandler(e)}
                    placeholder="Search..."
                />
                <Button
                    href="http://localhost:3001/api/web/spotify/auth"
                    variant="contained"
                    color="primary"
                    className={classes.refresh_button}
                >
                    Refresh Spotify
                </Button>
                </div>
                <Grid 
                    container 
                    spacing={3} 
                    justify="space-evenly" 
                    alignItems="stretch"
                    style= {{   
                                marginTop: "1%",
                                margin: "1% !important"
                            }}
                >

                    {this.state.search ? (this.state.search.items.map((track) =>
                        <Grid item xs={3}>
                            <SongCard
                                // title={show.Title}
                                // year={show.Year}
                                // poster={show.Poster}
                                // type={show.Type}
                                media={track}
                            />
                        </Grid>
                    )) : console.log("empty")}

                </Grid>
            </div>
        );
    }
}

SearchPage.propTypes= {
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