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

export const addBook = (med) => dispatch => {
  console.log(med)
  server.post('/api/web/av/get', {
    imdbID: med.industryIdentifiers[0].identifier,
    title: med.title,
    type: "Book",
    poster: med.imageLinks.thumbnail,
    author: med.authors[0],
    genre: med.categories[0],
    pages: med.pageCount,
    publishedDate: med.publishedDate,
    description: med.description
  }).then(res =>
    dispatch({
      type: ADD_MEDIA,
      payload: res.data
    }));
};

export const addPodcast = (med) => dispatch => {
  console.log(med)
  server.post('/api/web/av/get', {
    imdbID: med.id,
    title: med.name,
    type: med.type,
    poster: med.images[0].url,
    author: med.publisher,
    pages: med.total_episodes,
    description: med.description
  }).then(res =>
    dispatch({
      type: ADD_MEDIA,
      payload: res.data
    }));
};

export const addEpisode = (med) => dispatch => {
  console.log(med)
  server.post('/api/web/av/get', {
    imdbID: med.id,
    title: med.name,
    type: med.type,
    poster: med.images[0].url,
    publishedDate: med.release_date,
    description: med.description,
    pages: med.duration_ms
  }).then(res =>
    dispatch({
      type: ADD_MEDIA,
      payload: res.data
    }));
};

export const addSong = (med) => dispatch => {
  console.log(med)
  server.post('/api/web/av/get', {
    imdbID: med.id,
    title: med.name,
    type: med.type,
    poster: med.album.images[0].url,
    description: med.album.name,
    author: med.artists[0].name,
    pages: med.duration_ms,
  }).then(res =>
    dispatch({
      type: ADD_MEDIA,
      payload: res.data
    }));
};

export const addAlbum = (med) => dispatch => {
  console.log("TRYING TO ADD")
  console.log(med.artists)
  server.post('/api/web/av/get', {
    imdbID: med.id,
    title: med.name,
    type: med.type,
    poster: med.images[0].url,
    //description: med.album.name,
    author: med.artists[0].name,
    pages: med.total_tracks,
    publishedDate: med.release_date
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
