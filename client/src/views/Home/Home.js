import React, { Component, useState } from 'react';
import './Home.css';
import RegisterCard from '../../components/RegisterCard'
import Background from '../../assets/background.jpg';
import Header from "../../components/Header"
import { Typography } from '@material-ui/core/';
import { createMuiTheme } from '@material-ui/core/';
import { CssBaseline } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'react';
import { Grid, Paper } from '@material-ui/core/';
import BookIcon from '../../assets/book-icon.png';
import FilmIcon from '../../assets/film-icon.png';
import TVIcon from '../../assets/television-icon.png';
import PodIcon from '../../assets/headphones-icon.png';
import MusicIcon from '../../assets/note-icon.png';
import Placeholder from '../../components/Placeholder'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {UserContext} from '../../Context/UserContext';
import compose from 'recompose/compose';


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
        width: "100%"
    },
    rootCard: {
        minWidth: 275,
        maxWidth: 275,
        position: "absolute",
        alignItems: "center"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 32,
        color: "#2138A0",
        marginLeft: "1em",
        marginTop: "0.5em"
    },
    category: {
        align: "right",
        fontSize: 24,
        color: "#FFFFFF",
    },
    subtitle: {
        fontSize: 28,
        color: "#828282",
    },
    inputInput: {
        background: "#FFFFFF",
        borderColor: "#BDBDBD",
        borderWidth: '1px',
        border: "solid",
        borderRadius: "2px",
    },
    inputRoot: {
        flexGrow: 1,
        marginBottom: "0.5em"
    },
    button: {
        background: "#FF7D63",
        borderColor: "#FFFFFF",
        borderRadius: "20px",
        marginLeft: "1em",
        alignSelf: "center",
        color: "#FFFFFF",
        marginLeft: "5.5em"
    },
    pos: {
        marginBottom: 12,
    },
    paper: {
        background: "linear-gradient(304.84deg, #5776FF -18.57%, #FF947E 102.99%)",
        maxWidth: "180px",
        maxHeight: "180px"
    }
});


class Home extends Component {

    static contextType = UserContext;
    constructor(props) {
        super(props);
        //Let's declare an empty profile state here.
        this.state = {
          profile: {},
        };

    }
    componentDidMount() {
        // const user = this.context
        // console.log(user);
        // this._initProfile();
        // const context = this.context;
        // console.log(context);
       
    }

    _initProfile() {
        const context = this.context;
        //Let's fill the context with some value! You can get it from db too.
        const profileData = {
          fullName: 'John Doe',
          username: 'johndoe',
        //   email: '123',
        }
        //Call our setProfile method that we declared in App Component.
        context.setCurrUser(profileData);
      }
    
    render() {
        const {classes} = this.props;
        // const {profile} = this.state;
        return (
            <div className="App">
               
                <Header />
                <div class="container">
                    <div class="crop-height flip">
                        <img class="scale flip" src={Background} />
                    </div>
                    <div className="card">
                        <RegisterCard />
                    </div>
                </div>
                <Typography variant="h5" className={classes.title} color="textSecondary" align="left" gutterBottom>
                    Categories
                </Typography>

                <Grid container spacing={3} alignItems="stretch" justify="space-evenly">
                    <Grid item xs={2}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" className={classes.category} color="textSecondary" align="left" gutterBottom>
                                Books
                         </Typography>
                            <img class="icon scale" src={BookIcon} />
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" className={classes.category} color="textSecondary" align="left" gutterBottom>
                                Movies
                         </Typography>
                            <img class="icon scale" src={FilmIcon} />
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" className={classes.category} color="textSecondary" align="left" gutterBottom>
                                TV
                         </Typography>
                            <img class="icon scale" src={TVIcon} />
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" className={classes.category} color="textSecondary" align="left" gutterBottom>
                                Podcast
                         </Typography>
                            <img class="icon scale" src={PodIcon} />
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" className={classes.category} color="textSecondary" align="left" gutterBottom>
                                Music
                         </Typography>
                            <img class="icon scale" src={MusicIcon} />
                        </Paper>
                    </Grid>
                </Grid>
                <Typography variant="h5" className={classes.title} color="textSecondary" align="left" gutterBottom>
                    Popular reviews
        </Typography>

                <Placeholder />
                <div>
                    <h1>testing</h1>
        {/* <h1>{profile}</h1> */}
                </div>
            </div>
        );
    }
}


export default compose(
    withStyles(styles),
)(Home);
//export default Home;