const SET_POINTS = "SET_POINTS";

const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_MENTOR_POINTS = "SET_MENTOR_POINTS";
const SET_STUDENT_POINTS = "SET_STUDENT_POINTS";
const SET_SELECTED_USER = "SET_SELECTED_USER";
const SET_POSTS = "SET_POSTS";
const SET_LIKES = "SET_LIKES";
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
      console.log("before set likes reducer", state.likes);
      const { data } = action;

      state = {...state, likes: [...state.likes, data]}
      console.log("after set likes reducer", state.likes);

      return  state;
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
  SET_POINTS,
  SET_POSTS,
  SET_APPLICATION_DATA,
  SET_MENTOR_POINTS,
  SET_STUDENT_POINTS,
  SET_SELECTED_USER,
  SET_LIKES,
};
