import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../setAuthToken';
import * as types from './actionTypes';

/** @module  */

const server = axios.create({
  baseURL: 'http://localhost:3001'
})


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