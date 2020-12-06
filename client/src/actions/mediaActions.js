import axios from 'axios';

import {
  ADD_MEDIA,
  GET_MEDIA,
  UPDATE_MEDIA_LIKES
} from './actionTypes';

let dev = 1 // dev = 1 => LOCAL
            // dev = 0 => HEROKU

let server_dev = axios.create({
  baseURL: 'http://localhost:3001'
})

let server_heroku = axios.create({
  baseURL: ''
})

let server = (dev) ? server_dev : server_heroku

export const addMedia = (med) => dispatch => {
  console.log(med)
  server.post('/api/web/av/get', {
    imdbID: med.imdbID,
    title: med.Title,
    type: med.Type,
    poster: med.Poster,
    year: med.Year
  }).then(res =>
    dispatch({
      type: ADD_MEDIA,
      payload: res.data
    }));
};

export const getMedia = id => async (dispatch) => {
  const result = await server.get(`/api/web/av/get/${id}`);
  return dispatch({
    type: GET_MEDIA,
    payload: result.data
  });
};

export const updateMediaLikes = (action, postId, likerId) => dispatch =>{
  console.log("liked");
server.patch(`/api/web/av/edit/${postId}`, { action, id: likerId }).then(res =>
    dispatch({
      type: UPDATE_MEDIA_LIKES,
      payload: res.data
    }))
  };
