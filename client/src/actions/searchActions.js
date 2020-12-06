import axios from 'axios';

let dev = 0 // dev = 1 => LOCAL
            // dev = 0 => HEROKU

let server_dev = axios.create({
  baseURL: 'http://localhost:3001'
})

let server_heroku = axios.create({
  baseURL: ''
})

let server = (dev) ? server_dev : server_heroku

/** @module  */

/** 
 * Search in IMDB
 * @method
 */
export const search = (req) => dispatch =>
  server.get('/api/web/imdb/search', {params: {title: req}}).then(res =>
    dispatch({
      type: "SEARCH_OMDB",
      payload: res.data
    }));

