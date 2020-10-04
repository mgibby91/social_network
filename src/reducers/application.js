const SET_POINTS = "SET_POINTS";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_MENTOR_POINTS = "SET_MENTOR_POINTS";
const SET_STUDENT_POINTS = "SET_STUDENT_POINTS";
const SET_SELECTED_USER = "SET_SELECTED_USER";
const SET_POSTS = "SET_POSTS";
const SET_NEW_INFO = "SET_NEW_INFO";
const REMOVE_FROM_STACK = "REMOVE_FROM_STACK";
const ADD_TO_STACK = "ADD_TO_STACK";
const SET_COMMENTS = "SET_COMMENTS";
const SET_LIKES = "SET_LIKES";
// REDUCER INCLUDES SETTING POINTS
export default function reducer(state, action) {
  switch (action.type) {
    case SET_POSTS: {
      const { data } = action;
      state = { ...state, posts: [...state.posts, data] };
      return state;
    }

    case SET_NEW_INFO: {
      console.log("HERE");
      const { data, id } = action;
      const index = state.users.findIndex((x) => x.id === id);
      const users = [...state.users];
      const user = users[index];

      const keys = Object.keys(data);
      for (let el of keys) {
        console.log("from reducer", el);
        user[el] = data[el];
      }
      state = { ...state, users: users };
      console.log("from reducer", state.users);

      return state;
    }

    case SET_LIKES: {
      const { data } = action;
      state = { ...state, likes: [...state.likes, data] };
      return state;
    }

    case SET_COMMENTS: {
      const { data } = action;
      state = { ...state, comments: [...state.comments, data] };

      return state;
    }

    case REMOVE_FROM_STACK: {
      const { removed } = action;
      const removedState = state.mentor_stack.filter((stack) => {
        for (let removedStack of removed) {
          if (
            stack.user_id === removedStack.user_id &&
            stack.name === removedStack.name
          ) {
            return false;
          }
        }
        return true;
      });
      state = { ...state, mentor_stack: removedState };
      return state;
    }

    case ADD_TO_STACK: {
      const { added } = action;
      state = { ...state, mentor_stack: [...state.mentor_stack, ...added] };
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
        avatars,
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
        avatars,
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
  SET_NEW_INFO,
  REMOVE_FROM_STACK,
  ADD_TO_STACK,
  SET_LIKES,
  SET_POINTS,
};
