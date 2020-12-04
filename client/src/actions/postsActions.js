import axios from 'axios';

import {
  ADD_COMMENT,
  GET_POSTS,
  CREATE_POST,
  EDIT_COMMENT,
  EDIT_POST,
  DELETE_COMMENT,
  DELETE_POST,
  UPDATE_POST_LIKES
} from './actionTypes';

const server = axios.create({
  baseURL: 'https://meedien.herokuapp.com:' + process.env.PORT
})

export const getPosts = () => dispatch =>
axios.get('/api/web/posts').then(res => 
    dispatch({
      type: GET_POSTS,
      payload: res.data
    }));


export const createPost = (text, user) => dispatch =>
  server.post('/api/web/posts', {
    text,
    author: user.user_info.username,
    authorId: user.user_info.id,
    avatarColor: user.user_info.avatarColor
  }).then(res =>
    dispatch({
      type: CREATE_POST,
      payload: res.data
    }));


export const editPost = (id, text, author) => dispatch =>
  server.patch(`/api/web/posts/${id}`, { id, text, author }).then(res =>
    dispatch({
      type: EDIT_POST,
      id,
      text,
      author
    }));

export const deletePost = id => {
  return dispatch => {
    server.delete(`/api/web/posts/${id}`).then(res =>
      dispatch({
        type: DELETE_POST,
        id
      }));
  };
};

export const deleteComment = (action, commentId, postId) => dispatch =>
  server.patch(`/api/web/posts/${postId}`, { action, commentId }).then(res =>
    dispatch({
      type: DELETE_COMMENT,
      payload: res.data
    }));

export const editComment = (action, commentId, postId, text) => dispatch =>
  server.patch(`/api/web/posts/${postId}`, { action, commentId, text }).then(res =>
    dispatch({
      type: EDIT_COMMENT,
      payload: res.data
    }));

export const updatePostLikes = (action, postId, likerId) => dispatch =>
axios.patch(`/api/web/posts/${postId}`, { action, id: likerId }).then(res =>
    dispatch({
      type: UPDATE_POST_LIKES,
      payload: res.data
    }));

export const addComment = (
  action,
  commenterId,
  postId,
  text,
  timestamp
) => dispatch =>
    server
      .patch(`/api/web/posts/${postId}`, { action, commenterId, text, timestamp })
      .then(res =>
        dispatch({
          type: ADD_COMMENT,
          payload: res.data,
          commenterId,
          text,
          timestamp
        }));
