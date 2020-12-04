import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Background from '../assets/background.jpg';
import { logoutUser } from '../actions/authActions';
import Header2 from '../components/Header2';
import axios from 'axios';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
    justifyContent: 'center',
    left: '50%',
    outline: 'none',
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%'
  }
});

const spotify_token = async val => {
  
};

const SettingsPage = ({ classes, logout }) => (
  <div>
    
    <Header2 />
    <div class="container">
        <div class="crop-height flip">
            <img class="scale flip" src={Background} />
        </div>
    </div>
    <Paper className={classes.container}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={logout}
      >
        Log Out
      </Button>
      <Button
        href="http://localhost:3001/api/web/spotify/auth"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick="http://localhost:3001/api/web/spotify/auth"
      >
        Connect to Spotify
      </Button>
    </Paper>
  </div>
);

SettingsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export default compose(
  withStyles(styles),
  connect(
    undefined,
    mapDispatchToProps
  )
)(SettingsPage);