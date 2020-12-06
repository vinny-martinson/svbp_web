import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, ThemeProvider } from '@material-ui/core/';
import { CardActions } from '@material-ui/core/';
import { CardContent } from '@material-ui/core/';
import { Button } from '@material-ui/core/';
import { Grid, Paper } from '@material-ui/core/';
import { Typography } from '@material-ui/core/';
import { InputBase } from '@material-ui/core/';
import { createMuiTheme } from '@material-ui/core/';
import { CssBaseline } from '@material-ui/core/';
import Header from "./Header"

import AirBnBCereal from '../assets/AirbnbCerealExtraBold.ttf'

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
    color: "#3E61FF",
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
  alignSelf: "center",
  color: "#FFFFFF",
  marginLeft: "7em"
},
pos: {
  marginBottom: 12,
},
});

export default function RegisterCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs>
          </Grid>
          <Grid item xs>
          </Grid>
          <Grid item xs>
            <Card className={classes.rootCard}>
              <CardContent>
                <Typography variant="h5" className={classes.title} color="textSecondary" gutterBottom>
                  New Here?
        </Typography>
                <Typography variant="h6" className={classes.subtitle}>
                  {/* Create account! */}
        </Typography>
                {/* <InputBase
                  placeholder="Username"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
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
                /> */}
              </CardContent>
              <CardActions>
                <Button size="medium" href="/signup" variant="contained" className={classes.button}>Sign Up</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>

  );
}