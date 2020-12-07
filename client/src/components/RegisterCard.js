import React, { Component } from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { registerUser } from '../actions/authActions';
import { Link } from 'react-router-dom';

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
    marginBottom: 5,
  },
});

class RegisterCard extends Component {

  state = {
    username: '',
    email: '',
    password: ''
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    const user = {
      username,
      email,
      password
    };
    const { history, createUser } = this.props;
    console.log(user);
    createUser(user, history);
  };

  render() {

    const { classes } = this.props;

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
                    Create account!
                </Typography>
                  {/* <form onSubmit={this.handleSubmit}>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="name">Username</InputLabel>
                      <Input
                        onChange={this.handleInputChange}
                        id="username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                      />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="email">Email Address</InputLabel>
                      <Input
                        onChange={this.handleInputChange}
                        id="email"
                        name="email"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormControl required fullWidth>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input
                        onChange={this.handleInputChange}
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      fullWidth
                      variant="raised"
                      color="primary"
                      className={classes.button}
                    >
                      Create Account
                </Button>
                  </form> */}

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
}

RegisterCard.propTypes = {
  classes: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
const mapDispatchToProps = dispatch => ({
  createUser: (user, history) => dispatch(registerUser(user, history))
});

export default compose(
  withStyles(styles),
  connect(
    undefined,
    mapDispatchToProps
  )
)(RegisterCard);