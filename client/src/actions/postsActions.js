import axios from 'axios';

import {
  GET_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST
} from './actionTypes';

const server = axios.create({
  baseURL: 'http://localhost:3001'
})

export const getPosts = () => dispatch =>
server.get('/api/web/posts').then((res) => {
    dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    });


export const createPost = (text, user) => dispatch => {
  console.log(text);
  console.log(user.user_info);  
  server.post('/api/web/posts', { 
      text, 
      author: user.user_info.username,
      authorId: user.user_info.id,
      avatarColor: user.user_info.avatarColor
    }).then((res) => {
      console.log('postsActions.js: The create post response is ', res);
      dispatch({
        type: CREATE_POST,
        payload: res.data
      });
    });
};

export const updatePost = (id, text, author) => dispatch =>
server.patch(`/api/web/posts/${id}`, { id, text, author }).then((res) => {
    dispatch({
      type: UPDATE_POST,
      id,
      text,
      author
    });
  });


export const deletePost = id => {
  return dispatch => {
    server.delete(`/api/web/posts/${id}`).then((res) => {
      dispatch({
        type: DELETE_POST,
        id
      });
    });
  };
};