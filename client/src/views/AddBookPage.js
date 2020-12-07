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
import BookCard from '../components/BookCard';
import { createMuiTheme } from '@material-ui/core/';
import { CssBaseline } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/';

import AirBnBCereal from '../assets/AirbnbCerealExtraBold.ttf'
import Loading from '../components/Loading';

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
class SearchBookPage extends Component {
    state = {
        search: null,
        loading: false,
        value: '',
        open: false,
        timeout: 0
    };

    search = async val => {

        this.setState({ loading: true });
        const self = this;
        axios.get(
        ` https://www.googleapis.com/books/v1/volumes?q=${val}`
        ).then(function(result){
            //const result = res.data.items;
            self.setState({ search: result.data.items, loading: false });
        })
        
    };

    onChangeHandler = async e => {
        
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            //search function
            this.search(e.target.value);
          }, 300);
        this.setState({ value: e.target.value });
    };

    render() {
        const { classes, getSearch } = this.props;
        console.log(this.state.search);
        return this.state.loading ? (
            <div>
                <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header2 />
                <Typography variant="h5" className={classes.title} color="#2138A0" gutterBottom>
                        {"Books"}
                </Typography>
                <div className={classes.center}>
                    <TextField
                        disable
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
                        placeholder="Search..."
                    />
                </div>
                <Loading />
                </ThemeProvider>
            </div>
            
        ) : (
            <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header2 />
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

                    {this.state.search ? (this.state.search.map((book) =>
                        <Grid item xs={3}>
                            <BookCard
                                media={book.volumeInfo}
                            />
                        </Grid>
                    )) : console.log("empty")}

                </Grid>
                </ThemeProvider>
            </div>
            );
    }
}

SearchBookPage.propTypes = {
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
)(SearchBookPage);