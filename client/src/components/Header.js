import React from 'react';
import { Button } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/';
import { AppBar } from '@material-ui/core/';
import { Toolbar } from '@material-ui/core/';
import { Typography } from '@material-ui/core/';
import { IconButton } from '@material-ui/core/';
import { InputBase } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../assets/meedien.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: "100%"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    inputInput: {
        background: "#FFFFFF",
        borderColor: "#BDBDBD",
        borderWidth: '1px',
        border: "solid",
        borderRadius: "6px",
    },
    inputRoot: {
        flexGrow: 1,
        marginLeft: "1em"
    },
    bar: {
        background: '#3E61FF',
        width: "100%"
    },
    button: {
        background: "#FF7D63",
        borderColor: "#FFFFFF",
        borderWidth: '1px',
        border: "solid",
        borderRadius: "20px",
        marginLeft: "1em",
        color: "#FFFFFF"
    }
    
  }));

function Header() {
     const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
        <img src={Logo} height="50"/>
          <Typography variant="h6" className={classes.title}>
             
          </Typography>
          <div className={classes.search}>
            <InputBase
              placeholder="Email address"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <InputBase
              placeholder="Password"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Button variant="contained" className={classes.button}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;