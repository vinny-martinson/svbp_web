import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:3001'
})

/** @module  */

/** 
 * Search in IMDB
 * @method
 */
export const search = (req) => dispatch =>
  axios.get('/api/web/imdb/search', {params: {title: req}}).then(res =>
    dispatch({
      type: "SEARCH_OMDB",
      payload: res.data
    }));

