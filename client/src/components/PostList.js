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
    onDetailPage,
    onMyActivity,
    postAuthorId,
    reviewId,
    signedInUserId
  ) => {
    if (onDetailPage){
      //console.log("onDetailPage");
      const { medium } = this.props;
      const reviewedID = medium.imdbID;
      //console.log(medium.type);
      return reviewId === reviewedID && postAuthorId !== signedInUserId;
    }
    else if (onMyActivity){
      const { medium } = this.props;
      const reviewedID = medium.imdbID;
      //console.log(medium);
      return reviewId === reviewedID && postAuthorId === signedInUserId;
    }
    else if (onProfilePage) {
      //console.log("onProfilePage");
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
      addComment,
      getUser,
      deleteComment,
      deletePost,
      editPost,
      editComment,
      history,
      updatePostLikes,
      user,
      onProfilePage,
      onDetailPage,
      onMyActivity
    } = this.props;  
    console.log("getUser", getUser);
    console.log("user", user);
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
            onDetailPage,
            onMyActivity,
            post.authorId,
            post.reviewId,
            user.user_info.id,
            history
          ) ? (
              <Post
                key={post._id}
                _id={post._id}
                author={post.author}
                authorId={post.authorId}
                avatarColor={post.avatarColor}
                likers={post.likers}
                comments={post.comments}
                likesCount={post.likesCount}
                signedInUserId={user.user_info.id}
                text={post.text}
                reviewId={post.reviewId}
                reviewTitle={post.reviewTitle}
                type={post.type}
                date={post.date}
                rating={post.rating}
                timestamp={post.timestamp}
                addComment={(action, commenterId, postId, text, timestamp) =>
                  addComment(action, commenterId, postId, text, timestamp)
                }
                deleteComment={(action, commentId, postId) =>
                  deleteComment(action, commentId, postId)
                }
                getUser={id => getUser(id)}
                deletePost={id => deletePost(id)}
                editComment={(action, commentId, postId, text) =>
                  editComment(action, commentId, postId, text)
                }
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
  posts: [
    {
      comments: []
    }
  ],
  history: {
    location: {
      pathname: ''
    }
  },
  onProfilePage: false,
  onDetailPage: false,
  onMyActivity: false
};

PostList.propTypes = {
  addComment: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  onProfilePage: PropTypes.bool,
  onDetailPage: PropTypes.bool,
  onMyActivity: PropTypes.bool,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      authorId: PropTypes.string.isRequired,
      comments: PropTypes.array,
      likers: PropTypes.array.isRequired,
      reviewId: PropTypes.array,
      reviewTitle: PropTypes.string,
      type: PropTypes.string,
      date: PropTypes.date,
      rating: PropTypes.number,
      likesCount: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired
    })
  ),
  getUser: PropTypes.func.isRequired,
  getFollowing: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired
  }).isRequired
};

export default PostList;