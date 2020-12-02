import React from 'react';
import './Home.css';
import '../Categories.js';
import './AboutUs.js';
import RegisterCard from '../../components/RegisterCard'
import Background from '../../assets/background.jpg';
import Header from "../../components/Header"
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
import TabNav from '../../components/TabNav'; 
import { NavLink } from 'react-router-dom';
import SearchField from 'react-search-field';

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


function AboutUs() {
    const classes = useStyles();

    return (
        
        <div className="App">
            <div class="container">
                <div class="crop-height flip">
                    <img class="scale flip" src={Background} />
                </div>
                <div className="card">
                    <RegisterCard />
                </div>
            </div>

            <Typography variant="h5" className={classes.title} color="textSecondary" align="left" gutterBottom>
                
                <NavLink
                        to="/Categories"
                        activeStyle={{
                            fontWeight: "bold",
                            color: "red"
                        }}
                        >
                        About Us
                        </NavLink> <em> </em> 
        </Typography>
          
                
                    <h1>Medieen is a webpage which facilitates users the search of podcasts, books,
movies and tv shows where they can give recommendation to each other in a commented
platform and where the links to access those are available</h1>,
                        

                        
   
        </div>
        
    );
}

export default AboutUs;