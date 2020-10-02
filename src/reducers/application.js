const SET_POINTS = "SET_POINTS";
const SET_POSTS = "SET_POSTS"
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_MENTOR_POINTS = "SET_MENTOR_POINTS";
const SET_STUDENT_POINTS = "SET_STUDENT_POINTS";
const SET_SELECTED_USER = "SET_SELECTED_USER";
const SET_COMMENTS = "SET_COMMENTS";
const SET_LIKES = "SET_LIKES";
const REMOVE_LIKE = "REMOVE_LIKE";

// REDUCER INCLUDES SETTING POINTS
export default function reducer(state, action) {
  switch (action.type) {
    case SET_POSTS: {
      console.log("before set posts reducer", state.posts);
      const { data } = action;

      state = { ...state, posts: [...state.posts, data] };
      console.log("after set posts reducer", state.posts);

      return state;
    }
    
    case SET_LIKES: {
      const { data } = action;
      state = {...state, likes: [...state.likes, data ]}
      return  state;
    }
    
    case REMOVE_LIKE: {
      const { data } = action;
      const newLikes = state.likes.filter(like => {
        if (like.post_id === data.post_id && like.liker_id === data.liker_id) {
          return false;
        } else {
          return true;
        }
      })
      console.log("newlike in reducer: ", newLikes);
      state = {...state, likes: newLikes}
      return  state;
    }

    case SET_COMMENTS: {
      console.log("before set comments reducer", state.comments);

      const { data } = action;

      console.log("action in set comments: ", data);
      state = { ...state, comments: [...state.comments, data] };
      console.log("after set comments reducer", state.comments);

      return state;
    }

    case SET_POINTS:
      return { ...state, points: action.points };

    case SET_APPLICATION_DATA:
      const {
        comments,
        mentor_points,
        mentor_stack,
        likes,
        messages,
        posts,
        student_points,
        student_stack,
        tutor_experiences,
        user_profiles,
        users,
        stack_preferences,
        posts_stacks,
        selected,
      } = action;

      return {
        ...state,
        comments,
        mentor_stack,
        mentor_points,
        likes,
        messages,
        posts,
        student_points,
        student_stack,
        tutor_experiences,
        user_profiles,
        users,
        stack_preferences,
        posts_stacks,
        selected,
      };

    case SET_SELECTED_USER:
      const matchingUser = state.users.find(
        (user) => user.id === action.userId
      );
      console.log("matching user: ", matchingUser);
      return { ...state, selected: matchingUser };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export {
  SET_POSTS,
  SET_COMMENTS,
  SET_APPLICATION_DATA,
  SET_MENTOR_POINTS,
  SET_STUDENT_POINTS,
  SET_SELECTED_USER,
  SET_LIKES,
  SET_POINTS,
  REMOVE_LIKE,
};
