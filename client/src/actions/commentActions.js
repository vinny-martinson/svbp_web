import axios from 'axios';
import {
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS
} from './actionTypes';

/** @module  */

const server = axios.create({
    baseURL: 'http://localhost:3001'
  })

/** 
 * Get all comments
 * @method
 */
export const getComments = postId => dispatch =>
  axios.get(`/api/web/posts/${postId}`).then((res) => {
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
  axios.patch(`/api/web/posts${postId}`, { commenterId, text, timestamp }).then(res =>
    dispatch({
      type: ADD_COMMENT,
      commenterId,
      text,
      timestamp
    }));