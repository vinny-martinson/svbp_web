import React, { useState, Component } from 'react';
import { Button } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/';
import { AppBar } from '@material-ui/core/';
import { Toolbar } from '@material-ui/core/';
import { Typography } from '@material-ui/core/';
import { IconButton } from '@material-ui/core/';
import { InputBase } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../assets/meedien.jpg';
import PropTypes from 'prop-types';
import { loginUser } from '../actions/authActions';
import { connect } from 'react-redux';

import compose from 'recompose/compose';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

//not logged in
const styles = theme => ({
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

});


// const mapDispatchToProps = dispatch => ({
//     loginUser: () => dispatch(loginUser())
// });

// const mapStateToProps = state => ({
//   user: state.authReducer.user
// });

class Header extends Component {
  state = {
    email: '',
    password: ''
  };
  // const { signInUser } = this.props;

  // const[email, setEmail] = useState("");
  // const[password, setPassword] = useState("");
  // const[userLogin, setUserLogin] = useState({
  //   email:"",
  //   password: ""
  // });
  handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState(() => ({ [name]: value }));
  };
  //make axios call to back end
  submitUser = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    const {signInUser} = this.props;
    signInUser(user);
  };


  //const classes = useStyles();
  // props
  // const { user } = this.props;
  // const { anchorEl } = this.state;
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.bar}>
          <Toolbar>
            <img src={Logo} height="50" />
            <Typography variant="h6" className={classes.title}>

            </Typography>
            <div className={classes.search}>
              <InputBase
                placeholder="Email address"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                // onChange={(e)=>setUserLogin({email: e.target.value})}
                inputProps={{ 'aria-label': 'search' }}
              />

              <InputBase
                placeholder="Password"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                // onChange={(e)=>setUserLogin({password: e.target.value})}
                inputProps={{ 'aria-label': 'search' }}
              />
              {/* {console.log(userLogin.password)}
            {console.log(userLogin.email)} */}
            </div>
            <Button variant="contained" onSubmit={()=>null} className={classes.button}>Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer
});

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  signInUser: PropTypes.func.isRequired
};

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
// export default Header;