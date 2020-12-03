import React, { Component } from 'react';
import PostFeed from '../components/PostFeed';
import CreatePost from '../components/CreatePost';
import Header2 from '../components/Header2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PostFeedView extends Component {
  componentDidMount = () => {
    const { history } = this.props;
    if (!localStorage.jwtToken) {
      history.push('/login');
    }
  };

  render() {
    return (
      <div>
        <Header2 />
        <CreatePost />
        <PostFeed />
      </div>
    )
  }
}

PostFeedView.propTypes = {
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(PostFeedView);