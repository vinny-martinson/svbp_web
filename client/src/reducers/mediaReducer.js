import {
    UPDATE_MEDIA_LIKES,
    GET_MEDIA
  } from '../actions/actionTypes';
  
  const initialState = {
    media: []
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_MEDIA_LIKES: {
        return {
          ...state,
          likers: action.payload.likers,
          likesCount: action.payload.likesCount
          // ...state,
          // posts: state.posts.map((post) => {
          //   if (post._id === action.payload._id) {
          //     return {
          //       ...post,
          //       likers: action.payload.likers,
          //       likesCount: action.payload.likesCount
          //     };
          //   }
          //   return post;
          // })
        };
      }
      default:
        return state;
    }
  };