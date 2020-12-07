import React from 'react';
import './Home.css';
import '../../views/Categories.js';
import './AboutUs.js';
import Card from "./Card";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";
import RegisterCard from '../../components/RegisterCard'
import Background from '../../assets/background.jpg';
import Header from "../../components/Header"
import { Typography } from '@material-ui/core/';
import { createMuiTheme } from '@material-ui/core/';
import { CssBaseline } from '@material-ui/core/';

import { Grid, Paper } from '@material-ui/core/';
import BookIcon from '../../assets/book-icon.png';
import FilmIcon from '../../assets/film-icon.png';
import TVIcon from '../../assets/television-icon.png';
import PodIcon from '../../assets/headphones-icon.png';
import MusicIcon from '../../assets/note-icon.png';
import Placeholder from '../../components/Placeholder'
import {Cell} from 'react-mdl';
import TabNav from '../../components/TabNav'; 
import { NavLink } from 'react-router-dom';
import SearchField from 'react-search-field';

import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';


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
    title2: {
        fontSize: 32,
        color: "#2138A0"
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
    },
    root: {
        maxWidth: 400,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      },

});


function Home() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    

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
        Radio
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
        Reality Show
        </NavLink> <em> </em>  
       </div> 

       <div label="Audio-books"> 
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
        Horror
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
                            className="link"
                            >
                            Books
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
                    className="link"
                    
                    >
                    Movies
                    </NavLink>

                         </Typography>
                        <img class="icon scale" src={FilmIcon} />
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                    <Typography variant="h5" className={classes.category} color="textSecondary" align="left" gutterBottom>
                    <NavLink
                    to="/Categories"
                    className="link"
                    >
                    TV
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
                        className="link"
                    >
                    Podcast
                    </NavLink> <em> </em> 

                         </Typography>
                        <img class="icon scale" src={PodIcon} />
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                    <Typography variant="h5" className={classes.category} color="textSecondary" align="left" gutterBottom>
                    <NavLink
                        to="/Categories"
                        className="link"
                        >
                        Music
                        </NavLink> <em> </em> 

                         </Typography>
                        <img class="icon scale" src={MusicIcon} />
                    </Paper>
                </Grid>
            </Grid>
            
            <Typography variant="h5" className={classes.title} color="textSecondary" align="left" gutterBottom>
                Popular reviews
            
            <Grid container spacing={1} className={classes.gridContainer}>
             <Grid item xs={2} sm={6} md={3}>
            <Card>
            </Card>
            </Grid>
           

            <Grid item xs={2} sm={6} md={3}>
            <Card1>
            </Card1>
            </Grid>

             <Grid item xs={2} sm={6} md={3}>
            <Card2>
            </Card2>
            </Grid>
    
              
             <Grid item xs={2} sm={6} md={3}>
            <Card3>
            </Card3>
            </Grid>
           
             
            
            </Grid>
           
               
        
                      
            </Typography>

       
        <Typography variant="h5" className={classes.title} color="textSecondary" align="left" gutterBottom>
                
                <NavLink
                        to="/AboutUs"
                        className={classes.title2}
                        >
                        About Us
                        </NavLink> <em> </em> 
        </Typography>
   
        </div>
        
    );
}

export default Home;