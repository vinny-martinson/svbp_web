import axios from 'axios';
import {
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS
} from './actionTypes';

/** @module  */

let dev = 0 // dev = 1 => LOCAL
            // dev = 0 => HEROKU

let server_dev = axios.create({
  baseURL: 'http://localhost:3001'
})

let server_heroku = axios.create({
  baseURL: ''
})

let server = (dev) ? server_dev : server_heroku

/** 
 * Get all comments
 * @method
 */
export const getComments = postId => dispatch =>
  server.get(`/api/web/posts/${postId}`).then((res) => {
    dispatch({
      type: GET_COMMENTS,
      payload: res.data
    });
  });

/** 
 * Add new comment
 * @method
 */
export const addComment = (postId, commenterId, text, timestamp) => dispatch =>
  server.patch(`/api/web/posts${postId}`, { commenterId, text, timestamp }).then(res =>
    dispatch({
      type: ADD_COMMENT,
      commenterId,
      text,
      timestamp
    }));