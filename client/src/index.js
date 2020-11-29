import React from 'react';
import ReactDOM from 'react-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { v4 as uuidv4 } from 'uuid';

import createStore from './store';
import setAuthToken from './setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authActions';
import { createPost, getPosts } from './actions/postsActions';
import './index.css';

const store = createStore();


store.dispatch(getPosts());

ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

