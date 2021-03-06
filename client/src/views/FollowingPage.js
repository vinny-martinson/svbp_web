import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import equal from 'fast-deep-equal';

import compose from 'recompose/compose';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {
    followUser,
    getFollowing,
    getUser,
    getAllUsers,
    unfollowUser
} from '../actions/userActions';
import Header2 from '../components/Header2';
import Loading from '../components/Loading';
import UserCard from '../components/UserCard';

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

export class FollowingPage extends Component {
    state = {
        loading: true,
        followingIds: [],
        followingUsers: []
    };

    componentDidMount = () => {
        const { authReducer, getFollowingUsers, history } = this.props;
        if (!localStorage.jwtToken) {
            history.push('/login');
        }
        getFollowingUsers(authReducer.user.user_info.id).then(() => {
            this.updateFollowing();
        });
    };

    componentDidUpdate(prevProps) {
        const { userReducer } = this.props;
        if (!equal(userReducer.following, prevProps.userReducer.following)) {
            this.updateFollowing();
        }
    }

    updateFollowing = () => {
        const { getCurrUser, userReducer } = this.props;
        // console.log("current");
        // console.log("reducer");
        // console.log(userReducer);
        let idsOfUsersYouAreFollowing = [];
        let usersYouAreFollowing = [];
        const requests = userReducer.following.map(userId =>
            getCurrUser(userId).then(res => {
                idsOfUsersYouAreFollowing = [
                    ...idsOfUsersYouAreFollowing,
                    res.payload.user.id
                ];
                //console.log("response")
                //console.log(res);
                usersYouAreFollowing = [...usersYouAreFollowing, res.payload.user];
            })
        );

        console.log(usersYouAreFollowing);

        Promise.all(requests).then(() => {
            this.setState({
                loading: false,
                followingIds: idsOfUsersYouAreFollowing,
                followingUsers: usersYouAreFollowing
            });
        });
    };

    render() {
        const {
            authReducer,
            classes,
            followThisUser,
            unfollowThisUser,
            getCurrUser
        } = this.props;
        const { followingIds, followingUsers, loading } = this.state;
        console.log(followingUsers);
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
                                {followingUsers.map(
                                    user =>
                                        (user._id === authReducer.user.userId ? null : (
                                            <Grid item key={user._id} sm={6} md={3} lg={2}>
                                                <UserCard
                                                    isFollowing={followingIds.includes(user._id)}
                                                    followUser={followThisUser}
                                                    listedUser={user}
                                                    getUser={getCurrUser}
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

FollowingPage.propTypes = {
    authReducer: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    followThisUser: PropTypes.func.isRequired,
    getCurrUser: PropTypes.func.isRequired,
    getFollowingUsers: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
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
)(FollowingPage);