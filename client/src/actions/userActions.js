import axios from 'axios';
import {
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_USER,
  GET_ALL_USERS,
  UPDATE_FOLLOWERS,
  UPDATE_FOLLOWING
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

export const getFollowers = userId => async (dispatch) => {
  const result = await server.get(`/api/web/users/profile/${userId}`);
  return dispatch({
    type: GET_FOLLOWERS,
    payload: result.data
  });
};

/* eslint-enable import/prefer-default-export */