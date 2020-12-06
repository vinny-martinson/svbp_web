import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../setAuthToken';
import * as types from './actionTypes';

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
 * Register User
 * @method
 */
export const registerUser = (user, history) => (dispatch) => {
  server
    .post('/api/web/users/signup', user)
    .then((res) => {
      history.push('/login');
    })
    .catch((err) => {
      console.log(err);
    });
};

/** 
 * Login User
 * @method
 */
export const loginUser = user => (dispatch) => {
  server
    .post('/api/web/users/signin', user)
    .then((res) => {
      const { token } = res.data;
      console.log('res.data', res.data);
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      console.log(err);
    });
};

/** 
 * Decode User
 * @method
 */
export const setCurrentUser = decoded => ({
  type: types.SET_CURRENT_USER,
  payload: decoded
});

/** 
 * Logout User
 * @method
 */
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  window.location.href = '/login';
};


/** 
 * Update User
 * @method
 */
export const updateCurrentUser = (
  bio,
  email,
  name,
  userId,
  showEmail
) => (dispatch) => {
  server.patch(`/api/web/users/${userId}`, { bio, email, name, showEmail })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => console.log(err));
};