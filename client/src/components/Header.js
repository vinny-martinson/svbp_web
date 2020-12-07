import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import { Button } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/';
import { AppBar } from '@material-ui/core/';
import { Toolbar } from '@material-ui/core/';
import { Typography } from '@material-ui/core/';
import { IconButton } from '@material-ui/core/';
import { InputBase } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../assets/meedien.jpg';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';

import { loginUser } from '../actions/authActions';

//not logged in
const styles = {
  root: {
      flexGrow: 1,
      width: "100%"
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
  },
  menuButton: {
      color: '#fff',
      fontSize: '18px',
      marginRight: '-15px',
      textTransform: 'none'
  }
};

class Header extends Component {

  state = {
    email: '',
    password: ''
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  /* eslint-disable react/destructuring-assignment, react/prop-types */
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
      window.location.href = '/'
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
      window.location.href = '/'
    }
  };
  /* eslint-enable react/destructuring-assignment, react/prop-types */

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    const { signInUser } = this.props;
    //console.log('==>1', signInUser)
    signInUser(user);
    //console.log('==>2', user)
  };

  render() {
    const classes = this.props;

    const { email, password } = this.state;


    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.bar}>
          <Toolbar>
            <img src={Logo} height="50" />
            <Typography variant="h6" className={classes.title}>

            </Typography>
            {/* <div className={classes.search}>
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
              password
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Button variant="contained" className={classes.button}>Login</Button> */}
            
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  signInUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer
});

const mapDispatchToProps = dispatch => ({
  signInUser: user => dispatch(loginUser(user))
});

  export default compose(
    withStyles(styles),
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(Header);