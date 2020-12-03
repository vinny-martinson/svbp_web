import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../setAuthToken';
import * as types from './actionTypes';

const server = axios.create({
    baseURL: 'http://localhost:3001'
  })

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

export const setCurrentUser = decoded => ({
  type: types.SET_CURRENT_USER,
  payload: decoded
});

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  window.location.href = '/login';
};

export const updateCurrentUser = (bio, email, name, userId) => (dispatch) => {
  server.patch(`/users/${userId}`, { bio, email, name })
  .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      }));
};