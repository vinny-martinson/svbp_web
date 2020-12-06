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
import { createMuiTheme } from '@material-ui/core/';
import { CssBaseline } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/';

import AirBnBCereal from '../assets/AirbnbCerealExtraBold.ttf'
import Header2 from '../components/Header2';
import MediaCard from '../components/ShowCard';

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
        open: false
    };

    search = async val => {

        this.setState({ loading: true });
        const res = await axios(
            `http://www.omdbapi.com/?s=${val}&apikey=81c75ea2`
        );
        const result = await res.data.Search;
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
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div>
                    <Header2 />
                    <Typography variant="h5" className={classes.title} color="#2138A0" gutterBottom>
                        {"TV & Film"}
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
                            label="Search" variant="filled"
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
                            marginTop: "1%"
                        }}
                    >

                        {this.state.search ? (this.state.search.map((show) =>
                            <Grid item xs={3}>
                                <MediaCard
                                    media={show}
                                />
                            </Grid>
                        )) : console.log("empty")}

                    </Grid>
                </div>
            </ThemeProvider>
        );
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