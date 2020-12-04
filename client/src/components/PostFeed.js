import { connect } from 'react-redux';
import PostList from '../components/PostList';
import {
  addComment,
  deletePost,
  editComment,
  deleteComment,
  getPosts,
  editPost,
  updatePostLikes
} from '../actions/postsActions';
import { getFollowing, getUser } from '../actions/userActions';


const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  addComment: (action, commenterId, postId, text, timestamp) =>
    dispatch(addComment(action, commenterId, postId, text, timestamp)),
  deletePost: id => dispatch(deletePost(id)),
  getFollowing: id => dispatch(getFollowing(id)),
  getUser: id => dispatch(getUser(id)),
  getPosts: () => dispatch(getPosts()),
  editComment: (action, commentId, postId, text) =>
    dispatch(editComment(action, commentId, postId, text)),
  deleteComment: (action, commentId, postId) =>
    dispatch(deleteComment(action, commentId, postId)),
  editPost: (id, text, author) => dispatch(editPost(id, text, author)),
  updatePostLikes: (action, postId, likerId) =>
    dispatch(updatePostLikes(action, postId, likerId))});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);