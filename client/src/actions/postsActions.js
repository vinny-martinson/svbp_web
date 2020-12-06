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
 * Get all posts
 * @method
 */

export const getPosts = () => dispatch =>
  server.get('/api/web/posts').then(res =>
    dispatch({
      type: GET_POSTS,
      payload: res.data
    }));

/** 
 * Create new post
 * @method
 */
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


export const createReview = (text, user, date, rating, medium) => dispatch =>  {
console.log(medium.type);
console.log(medium.reviewTitle);
  server.post('/api/web/posts', {
    text,
    author: user.user_info.username,
    authorId: user.user_info.id,
    avatarColor: user.user_info.avatarColor,
    date,
    rating,
    type: medium.type,
    reviewId: medium.imdbID,
    reviewTitle: medium.title
  }).then(res =>
    dispatch({
      type: CREATE_POST,
      payload: res.data
    }));
  }


/** 
 * Edit post
 * @method
 */

export const editPost = (id, text, author) => dispatch =>
  server.patch(`/api/web/posts/${id}`, { id, text, author }).then(res =>
    dispatch({
      type: EDIT_POST,
      id,
      text,
      author
    }));

/** 
 * Delete post
 * @method
 */
export const deletePost = id => {
  return dispatch => {
    server.delete(`/api/web/posts/${id}`).then(res =>
      dispatch({
        type: DELETE_POST,
        id
      }));
  };
};

/** 
 * Delete comment
 * @method
 */
export const deleteComment = (action, commentId, postId) => dispatch =>
  server.patch(`/api/web/posts/${postId}`, { action, commentId }).then(res =>
    dispatch({
      type: DELETE_COMMENT,
      payload: res.data
    }));

/** 
 * Edit comment
 * @method
 */   
export const editComment = (action, commentId, postId, text) => dispatch =>
  server.patch(`/api/web/posts/${postId}`, { action, commentId, text }).then(res =>
    dispatch({
      type: EDIT_COMMENT,
      payload: res.data
    }));

/** 
 * Update likes
 * @method
 */    
export const updatePostLikes = (action, postId, likerId) => dispatch =>
  server.patch(`/api/web/posts/${postId}`, { action, id: likerId }).then(res =>
    dispatch({
      type: UPDATE_POST_LIKES,
      payload: res.data
    }));

/** 
 * Add comment
 * @method
 */      
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
