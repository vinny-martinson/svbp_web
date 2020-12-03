import axios from 'axios';
import {
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS
} from './actionTypes';

const server = axios.create({
    baseURL: 'http://localhost:3001'
  })

export const getComments = postId => dispatch =>
  server.get(`/api/web/posts/${postId}`).then((res) => {
    dispatch({
      type: GET_COMMENTS,
      payload: res.data
    });
  });

export const addComment = (postId, commenterId, text, timestamp) => dispatch =>
  server.patch(`/api/web/posts${postId}`, { commenterId, text, timestamp }).then(res =>
    dispatch({
      type: ADD_COMMENT,
      commenterId,
      text,
      timestamp
    }));