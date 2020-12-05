import axios from 'axios';
import {
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_USER,
  GET_ALL_USERS,
  UPDATE_FOLLOWERS,
  UPDATE_FOLLOWING
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

/* eslint-disable import/prefer-default-export */

/** 
 * Get following for a user
 * @method
 */
export const getFollowing = userId => async (dispatch) => {
  const result = await server.get(`/api/web/users/profile/${userId}`);
  return dispatch({
    type: GET_FOLLOWING,
    payload: result.data
  });

};

/** 
 * Get specific User
 * @method
 */
export const getUser = userId => async (dispatch) => {
  const result = await server.get(`/api/web/users/profile/${userId}`);
  return dispatch({
    type: GET_USER,
    payload: result.data
  });
};

/** 
 * Get all users
 * @method
 */
export const getAllUsers = () => async (dispatch) => {
  const result = await server.get('/api/web/users');
  return dispatch({
    type: GET_ALL_USERS,
    payload: result.data
  });
};

/** 
 * Follow another user
 * @method
 */
export const followUser = (signedInUserId, idToFollow) => async (dispatch) => {
  console.log("signed: " + signedInUserId);
  console.log("to follow:" + idToFollow);
  const followResult = await server.patch(`/api/web/users/following/${signedInUserId}`, {
    idToFollow
  });
  const addFollowerResult = await server.patch(
    `/api/web/users/followers/${idToFollow}`,
    {
      followerId: signedInUserId
    }
  );
  dispatch({
    type: UPDATE_FOLLOWERS,
    payload: addFollowerResult.data
  });
  return dispatch({
    type: UPDATE_FOLLOWING,
    payload: followResult.data
  });
};

/** 
 * Unfollow user
 * @method
 */
export const unfollowUser = (
  signedInUserId,
  idToUnfollow
) => async (dispatch) => {
    const unfollowResult = await server.patch(
      `/api/web/users/unfollowing/${signedInUserId}`,
      {
        idToUnfollow
      }
    );
    const removeFollowerResult = await server.patch(
      `/api/web/users/unfollowers/${idToUnfollow}`,
      {
        unfollowerId: signedInUserId
      }
    );
    dispatch({
      type: UPDATE_FOLLOWERS,
      payload: removeFollowerResult.data
    });
    return dispatch({
      type: UPDATE_FOLLOWING,
      payload: unfollowResult.data
  });
};

/** 
 * Get followers for a user
 * @method
 */
export const getFollowers = userId => async (dispatch) => {
  const result = await server.get(`/api/web/users/profile/${userId}`);
  return dispatch({
    type: GET_FOLLOWERS,
    payload: result.data
  });
};

/* eslint-enable import/prefer-default-export */