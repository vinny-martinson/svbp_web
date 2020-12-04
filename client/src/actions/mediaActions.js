import axios from 'axios';

import {
  ADD_MEDIA,
  GET_MEDIA
} from './actionTypes';

const server = axios.create({
  baseURL: 'http://localhost:3001'
})

export const addMedia = (med) => dispatch => {
  console.log(med)
  axios.post('/api/web/av/get', {
    imdbID: med.imdbID,
    title: med.Title,
    type: med.Type
  }).then(res =>
    dispatch({
      type: ADD_MEDIA,
      payload: res.data
    }));
};

export const getMedia = id => async (dispatch) => {
  const result = await axios.get(`/api/web/av/get/${id}`);
  return dispatch({
    type: GET_MEDIA,
    payload: result.data
  });
};
