import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import compose from 'recompose/compose';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import equal from 'fast-deep-equal';

import Loading from '../components/Loading';
import Header2 from '../components/Header2';
import UserCard from '../components/UserCard';
import {
  getFollowing,
  getUser,
  followUser,
  getAllUsers,
  unfollowUser
} from '../actions/userActions';


const styles = theme => ({
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  layout: {
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3
    }
  }
});

export class DiscoverPage extends Component {
  state = {
    loading: true,
    following: []
  };

  componentDidMount = () => {
    const { history, retrieveAllUsers } = this.props;
    if (!localStorage.jwtToken) {
      history.push('/login');
    }

    retrieveAllUsers().then(() => {
      this.updateFollowing();
      this.setState({
        loading: false
      });
    });
  };

  componentDidUpdate(prevProps) {
    const { userReducer } = this.props;
    if (!equal(userReducer.following, prevProps.userReducer.following)) {
      this.updateFollowing();
    }
  }

  // Set "following" to the list of people the logged in user is following
  updateFollowing = () => {
    const { authReducer, getCurrUser } = this.props;

    getCurrUser(authReducer.user.user_info.id).then((res) => {
      this.setState({
        following: res.payload.user.following
      });
    });
  };

  render() {
    const {
      authReducer,
      classes,
      followThisUser,
      getCurrUser,
      userReducer,
      unfollowThisUser
    } = this.props;
    const { following, loading } = this.state;
    // console.log("auth id");
    // console.log(authReducer.user.user_info.id);
    return loading ? (
      <div>
      <Header2 />
      <Loading />
      </div>
    ) : (
        <div>
          <Header2 />
          <main>
            <div className={classNames(classes.layout, classes.cardGrid)}>
              <Grid container justify="center" spacing={40}>
              {userReducer.allUsers.map(
                user =>
                  (user._id === authReducer.user.userId ? null : (
                    <Grid item key={user._id} sm={6} md={3} lg={2}>
                      <UserCard
                        isFollowing={following.includes(user._id)}
                        followUser={followThisUser}
                        getUser={getCurrUser}
                        listedUser={user}
                        signedInUser={authReducer.user}
                        unfollowUser={unfollowThisUser}
                      />
                    </Grid>
                  ))
              )}
              </Grid>
            </div>
          </main>
        </div>
      );
  }
}

DiscoverPage.propTypes = {
  authReducer: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  followThisUser: PropTypes.func.isRequired,
  getCurrUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  retrieveAllUsers: PropTypes.func.isRequired,
  unfollowThisUser: PropTypes.func.isRequired,
  userReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  userReducer: state.userReducer
});

const mapDispatchToProps = dispatch => ({
  getCurrUser: id => dispatch(getUser(id)),
  getFollowingUsers: id => dispatch(getFollowing(id)),
  followThisUser: (signedInUserId, idToFollow) =>
    dispatch(followUser(signedInUserId, idToFollow)),
  retrieveAllUsers: () => dispatch(getAllUsers()),
  unfollowThisUser: (signedInUserId, idToUnfollow) =>
    dispatch(unfollowUser(signedInUserId, idToUnfollow))
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DiscoverPage);