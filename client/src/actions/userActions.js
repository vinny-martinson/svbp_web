import axios from 'axios';
import {
  FOLLOW_USER,
  GET_FOLLOWING,
  GET_USER,
  GET_ALL_USERS,
  UNFOLLOW_USER
} from './actionTypes';

const server = axios.create({
    baseURL: 'http://localhost:3001'
  })

/* eslint-disable import/prefer-default-export */

export const getFollowing = userId => async (dispatch) => {
  const result = await server.get(`/api/web/users/profile/${userId}`);
  return dispatch({
    type: GET_FOLLOWING,
    payload: result.data
  });

};

export const getUser = userId => async (dispatch) => {
  const result = await server.get(`/api/web/users/profile/${userId}`);
  return dispatch({
    type: GET_USER,
    payload: result.data
  });
};

export const getAllUsers = () => async (dispatch) => {
  const result = await server.get('/api/web/users');
  return dispatch({
    type: GET_ALL_USERS,
    payload: result.data
  });
};

export const followUser = (signedInUserId, idToFollow) => async (dispatch) => {
  console.log("signed: " + signedInUserId);
  console.log("to follow:" + idToFollow);
  const result = await server.patch(`/api/web/users/following/${signedInUserId}`, {
    idToFollow
  });
  return dispatch({
    type: FOLLOW_USER,
    payload: result.data
  });
};

export const unfollowUser = (
  signedInUserId,
  idToUnfollow
) => async (dispatch) => {
  const result = await server.patch(`/api/web/users/unfollowing/${signedInUserId}`, {
    idToUnfollow
  });
  return dispatch({
    type: UNFOLLOW_USER,
    payload: result.data
  });
};

/* eslint-enable import/prefer-default-export */