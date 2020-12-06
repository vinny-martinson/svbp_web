import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postsReducer from './postsReducer';
import userReducer from './userReducer';
import mediaReducer from './mediaReducer';

export default combineReducers({
  authReducer,
  mediaReducer,
  errorReducer,
  postsReducer,
  userReducer
});