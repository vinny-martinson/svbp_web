import {
  GET_POSTS,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  UPDATE_POST_LIKES
} from '../actions/actionTypes';

const initialState = {
  posts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...initialState,
        posts: action.payload
      };
    case CREATE_POST: {
      return {
        ...state,
        posts: [
          ...state.posts,
          {
            _id: action.payload._id,
            text: action.payload.text,
            author: action.payload.author,
            avatarColor: action.payload.avatarColor,
            authorId: action.payload.authorId,
            likers: action.payload.likers,
            likesCount: action.payload.likesCount,
            timestamp: action.payload.timestamp
          },
          ...state.posts
        ]
      };
    }
    case EDIT_POST: {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.id) {
            return {
              ...post,
              text: action.text,
              author: action.author
            };
          }
          return post;
        })
      };
    }
    case UPDATE_POST_LIKES: {
      console.log('update post likes', action);
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              likers: action.payload.likers,
              likesCount: action.payload.likesCount
            };
          }
          return post;
        })
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(({ _id }) => _id !== action.id)
      };
    }
    
    default:
      return state;
  }
};