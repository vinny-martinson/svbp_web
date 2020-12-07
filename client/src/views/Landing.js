import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Header from '../components/Header2';
import Loading from '../components/Loading'
import PostFeed from './PostFeedView';
import Home from "./Home/Home"

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '400px',
    justifyContent: 'center',
    left: '50%',
    outline: 'none',
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%'
  }
};

  class HomeComponent extends Component {    
      render() {
          return(
            <div>
                {localStorage.jwtToken ? <PostFeed/> : <Home/>}
            </div>
          )
      }
};

HomeComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeComponent);