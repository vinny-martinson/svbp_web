import * as types from './actionTypes';
import axios from 'axios';

export const getPosts = () => {
  return dispatch => {
    axios.get('/api/web/posts').then((res) => {
      console.log('postsActions.js: getPosts response.data:', res.data);
      dispatch({
        type: types.GET_POSTS,
        payload: res.data
      });
    });
  };
};

export const createPost = text => {
  console.log(`postsActions.js: Created post with text ${text}`);
  return dispatch => {
    axios.post('/api/web/posts', { text, author: 'unidentified' }).then((res) => {
      console.log('postsActions.js: The create post response is ', res);
      dispatch({
        type: types.CREATE_POST,
        payload: res.data
      });
    });
  };
};

export const updatePost = (id, text, author) => dispatch =>
  axios.patch(`/api/web/posts/${id}`, { id, text, author }).then((res) => {
    dispatch({
      type: types.UPDATE_POST,
      id,
      text,
      author
    });
  });


export const deletePost = id => {
  return dispatch => {
    axios.delete(`/api/web/posts/${id}`).then((res) => {
      dispatch({
        type: types.DELETE_POST,
        id
      });
    });
  };
};