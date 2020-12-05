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
            `https://www.omdbapi.com/?s=${val}&apikey=81c75ea2`
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
                    style= {{   
                                marginTop: "1%"
                            }}
                >

                    {this.state.search ? (this.state.search.map((show) =>
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