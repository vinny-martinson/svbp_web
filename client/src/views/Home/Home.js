import React from 'react';
import './Home.css';
import '../../views/Categories.js';
import RegisterCard from '../../components/RegisterCard'
import Background from '../../assets/background.jpg';
import Header from "../../components/Header2"
import AboutCard from '../../components/AboutCard'
import { Typography } from '@material-ui/core/';
import { createMuiTheme } from '@material-ui/core/';
import { CssBaseline } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core/';
import BookIcon from '../../assets/book-icon.png';
import FilmIcon from '../../assets/film-icon.png';
import TVIcon from '../../assets/television-icon.png';
import PodIcon from '../../assets/headphones-icon.png';
import MusicIcon from '../../assets/note-icon.png';
import Placeholder from '../../components/Placeholder'
import Footer from '../../components/Footer'
import TabNav from '../../components/TabNav'; 
import { NavLink, useParams } from 'react-router-dom';
import SearchField from 'react-search-field';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


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

const useStyles = makeStyles({
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

console.log('-> href ' + window.location.href)
let token = window.location.href
let found = token.search("#access_token=");
console.log('-> found_token? ' + found)
if (found != -1) {
    console.log("SAVED!")
    token = token.split("#access_token=")[1].split("&refresh_token=")[0]
    localStorage.setItem('spotify_token', token)
} else { 
    console.log("No token!");
}


function Home() {
    const classes = useStyles();
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
                <div className="about_card">
                    <AboutCard />
                </div>
            </div>
            <br/>
            {/* <SearchField
            placeholder="Search..."
            //onChange={onChange}
            searchText="Search for Books, Tv shows, Podcasts, Movies, or Music"
            classNames="test-class"
            /> */}

            <TabNav> 
       <div label="Music"> 
       <NavLink
        to="/Categories"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Rock,
        </NavLink>
          <em> </em> 
          <NavLink
        to="/Categories"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >Jazz,</NavLink><em> </em>  

          <NavLink
        to="/Categories"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Electronic music,
        </NavLink> <em> </em> 
        <NavLink
        to="/Categories"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Reggae,
        </NavLink> <em> </em> 
        <NavLink
        to="/Categories"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Hip Hop,
        </NavLink><em> </em> 
        <NavLink
        to="/Categories"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Rap
        </NavLink> <em> </em> 

       </div> 
       <div label="Podcast"> 
          <em> </em> 
          <NavLink
        to="/https://www.spotify.com/us/"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Interview,
        </NavLink> <em> </em> 
        <NavLink
        to="/https://www.spotify.com/us/"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Monologue,
        </NavLink> <em> </em> 
        <NavLink
        to="/https://www.spotify.com/us/"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Conversational,
        </NavLink><em> </em>  
        <NavLink
        to="/https://www.spotify.com/us/"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Storytelling,
        </NavLink> <em> </em> 
        <NavLink
        to="/https://www.spotify.com/us/"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Radio,
        </NavLink><em> </em> 
       </div> 

       <div label="TV"> 
       <NavLink
        to="/https://www.spotify.com/us/"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Dramas,
        </NavLink><em> </em> 
        <NavLink
        to="/https://www.spotify.com/us/"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Daytime,
        </NavLink> <em> </em> 
        <NavLink
        to="/https://www.spotify.com/us/"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        News,
        </NavLink> <em> </em> 
        <NavLink
        to="/https://www.spotify.com/us/"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Cooking,
        </NavLink> <em> </em> 
        <NavLink
        to="/https://www.spotify.com/us/"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Reality Show,
        </NavLink> <em> </em>  
       </div> 

       <div label="Books"> 
       <NavLink
        to="/https://www.spotify.com/us/"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Nonfiction,
        </NavLink> <em> </em> 
        <NavLink
        to="/https://www.spotify.com/us/"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Fiction,
        </NavLink> <em> </em> 
        <NavLink
        to="/https://www.spotify.com/us/"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        History,
        </NavLink><em> </em> 
        <NavLink
        to="/https://www.spotify.com/us/"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Self-help,
        </NavLink> <em> </em> 
        <NavLink
        to="/https://www.spotify.com/us/"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Enciclopedia,
        </NavLink> <em> </em> 
        <NavLink
        to="/https://www.spotify.com/us/"
        activeStyle={{
            fontWeight: "bold",
            color: "red"
        }}
        >
        Horror,
        </NavLink> <em> </em> 
       </div> 
            </TabNav> 
            <Typography variant="h5" className={classes.title} color="textSecondary" align="left" gutterBottom>
                Categories
        </Typography>

            <Grid container spacing={3} alignItems="stretch" justify="space-evenly">
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" className={classes.category} color="textSecondary" align="left" gutterBottom>
                        <NavLink
                            to="/Categories"
                            activeStyle={{
                                fontWeight: "bold",
                                color: "red"
                            }}
                            >
                            <Link onClick={() => window.location.href=`/books`} to={`/books`}>
                                Books
                            </Link>
                            </NavLink> <em> </em> 

                         </Typography>
                        <img class="icon scale" src={BookIcon} />
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                    <Typography variant="h5" className={classes.category} color="textSecondary" align="left" gutterBottom>
                    <NavLink
                        to="/Categories"
                        activeStyle={{
                            fontWeight: "bold",
                            color: "red"
                        }}
                        >
                        <Link onClick={() => window.location.href=`/add`} to={`/add`}>
                        Movies
                        </Link>
                        </NavLink> <em> </em> 

                         </Typography>
                        <img class="icon scale" src={FilmIcon} />
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                    <Typography variant="h5" className={classes.category} color="textSecondary" align="left" gutterBottom>
                    <NavLink
                    to="/Categories"
                    activeStyle={{
                        fontWeight: "bold",
                        color: "red"
                    }}
                    >
                    <Link onClick={() => window.location.href=`/add`} to={`/add`}>
                        TV
                    </Link>
                    </NavLink> <em> </em> 

                         </Typography>
                        <img class="icon scale" src={TVIcon} />
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                    <Typography variant="h5" className={classes.category} color="textSecondary" align="left" gutterBottom>
                    <NavLink
                        to="/Categories"
                    activeStyle={{
                        fontWeight: "bold",
                        color: "red"
                    }}
                    >
                    <Link onClick={() => window.location.href=`/podcasts`} to={`/podcasts`}>
                        Podcasts
                        </Link>
                    </NavLink> <em> </em> 

                         </Typography>
                        <img class="icon scale" src={PodIcon} />
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                    <Typography variant="h5" className={classes.category} color="textSecondary" align="left" gutterBottom>
                    
                        <Link onClick={() => window.location.href=`/songs`} to={`/songs`}>
                        Music
                        </Link>

                         </Typography>
                        <img class="icon scale" src={MusicIcon} />
                    </Paper>
                </Grid>
            </Grid>
            <Typography variant="h5" className={classes.title} color="textSecondary" align="left" gutterBottom>
                Popular reviews
        </Typography>

        <Footer/>
        <Placeholder/>

        </div>
        
    );
}

export default Home;