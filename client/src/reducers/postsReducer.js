import {
  ADD_COMMENT,
  GET_POSTS,
  CREATE_POST,
  EDIT_POST,
  EDIT_COMMENT,
  DELETE_COMMENT,
  DELETE_POST,
  UPDATE_POST_LIKES
} from '../actions/actionTypes';

const initialState = {
  posts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
<<<<<<< HEAD
    case types.GET_POSTS:
      return {
        ...initialState,
        posts: action.payload
      };
    case types.CREATE_POST: {
=======
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              comments: [
                ...post.comments,
                {
                  _id:
                    action.payload.comments[action.payload.comments.length - 1]
                      ._id,
                  commenterId: action.commenterId,
                  text: action.text,
                  timestamp: action.timestamp
                }
              ]
            };
          }
          return post;
        })
      };
    case GET_POSTS:
      return {
        ...initialState,
        posts: action.payload
      };
    case CREATE_POST: {
>>>>>>> master
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
<<<<<<< HEAD
            timestamp: action.payload.timestamp
          }
        ]
      };
    }
    case types.UPDATE_POST: {
=======
            likers: action.payload.likers,
            comments: [],
            likesCount: action.payload.likesCount,
            timestamp: action.payload.timestamp
          },
          ...state.posts
        ]
      };
    }
    case EDIT_POST: {
>>>>>>> master
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.id) {
            return {
              ...post,
              text: action.text,
              author: action.author
<<<<<<< HEAD
=======
            };
          }
          return post;
        })
      };
    }
    case UPDATE_POST_LIKES: {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              likers: action.payload.likers,
              likesCount: action.payload.likesCount
>>>>>>> master
            };
          }
          return post;
        })
      };
    }
<<<<<<< HEAD
    case types.DELETE_POST: {
=======
    case EDIT_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              comments: action.payload.comments
            };
          }
          return post;
        })
      };
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              comments: action.payload.comments
            };
          }
          return post;
        })
      };
    case DELETE_POST: {
>>>>>>> master
      return {
        ...state,
        posts: state.posts.filter(({ _id }) => _id !== action.id)
      };
    }
    
    default:
      return state;
  }
};