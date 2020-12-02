import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import Loading from './Loading';

class PostList extends Component {
  state = {
    following: [],
    loading: true
  };

  componentDidMount = () => {
    const { getPosts, getFollowing, user } = this.props;
    //console.log(user);
    getPosts().then(() => {
      getFollowing(user.user_info.id).then((res) => {
        this.setState({
          following: res.payload.user.following,
          loading: false
        });
      });
    });
  };

  checkPageType = (
    followingList,
    onProfilePage,
    postAuthorId,
    signedInUserId
  ) => {
    if (onProfilePage) {
      const { match } = this.props;
      const userProfileId = match.params.id;
      return postAuthorId === userProfileId;
    }
    return (
      followingList.includes(postAuthorId) || postAuthorId === signedInUserId
    );
  };

  render() {
    const {
      posts,
      deletePost,
      editPost,
      history,
      updatePostLikes,
      user,
      onProfilePage
    } = this.props;  
    
    const { following, loading } = this.state;

    return loading ? (
      <Loading />
    ) : (
      <div>
        {posts.map(
          post =>
          (this.checkPageType(
            following,
            onProfilePage,
            post.authorId,
            user.userId,
            history
          ) ? (
              <Post
                key={post._id}
                _id={post._id}
                author={post.author}
                authorId={post.authorId}
                avatarColor={post.avatarColor}
                likers={post.likers}
                likesCount={post.likesCount}
                signedInUserId={user.user_info.id}
                text={post.text}
                timestamp={post.timestamp}
                deletePost={id => deletePost(id)}
                editPost={(id, text, author) => editPost(id, text, author)}
                updatePostLikes={(action, postId, likerId) =>
                  updatePostLikes(action, postId, likerId)
                }
              />
            ) : null)
        )}
      </div>
    );
  }
}


PostList.defaultProps = {
  posts: [],
  history: {
    location: {
      pathname: ''
    }
  },
  onProfilePage: false
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      authorId: PropTypes.string.isRequired,
      likers: PropTypes.array.isRequired,
      likesCount: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired
    })
  ),
  deletePost: PropTypes.func.isRequired,
  updatePostLikes: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  onProfilePage: PropTypes.bool,
  getFollowing: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired
  }).isRequired
};

export default PostList;