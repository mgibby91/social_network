const SET_POINTS = "SET_POINTS";
const SET_POSTS = "SET_POSTS";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_MENTOR_POINTS = "SET_MENTOR_POINTS";
const SET_STUDENT_POINTS = "SET_STUDENT_POINTS";
const SET_SELECTED_USER = "SET_SELECTED_USER";
const SET_POSTS = "SET_POSTS";
const SET_NEW_INFO = "SET_NEW_INFO";
const SET_NEW_STACK = "SET_NEW_STACK";
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
      //console.log("from reducer", state);
      const { data, id } = action;
      const index = state.user_profiles.findIndex((x) => x.id === id);
      //console.log("from reduer", index);
      //console.log("from reduer", state.user_profiles[index]);
      const users = [...state.user_profiles];
      const user = users[index];

      const keys = Object.keys(data);
      for (let el of keys) {
        console.log("from reducer", el);
        user[el] = data[el];
      }
      state = { ...state, posts: [...state.posts, data] };
      console.log("after set posts reducer", state.posts);

      return state;
    }

    case SET_LIKES: {
      const { data } = action;
      state = { ...state, likes: [...state.likes, data] };
      return state;
    }

    case SET_COMMENTS: {
      console.log("before set comments reducer", state.comments);

      const { data } = action;

      console.log("action in set comments: ", data);
      state = { ...state, comments: [...state.comments, data] };
      console.log("after set comments reducer", state.comments);

      //console.log("from reducer", user, users);
      // const user = state.user_profiles;
      state = { ...state, user_profiles: users };
      console.log("from reducer after", state.user_profiles);
      return state;
    }
    case SET_NEW_STACK: {
      // console.log("here");
      // const { removed, added } = action;
      // const removedStack = [];
      // for (let entry of state.mentor_stack) {
      //   let duplicate = false;
      //   for (let el of removed) {
      //     if (
      //       entry["user_id"] !== el["user_id"] &&
      //       entry["name"] !== el["name"]
      //     ) {
      //       duplicate = true;
      //       console.log(true);
      //     }
      //   }
      // if ((duplicate = true)) {
      //   removedStack.push(entry);
      // }
      //}
      //console.log(removedStack);
      // state = { ...state, mentor_stack: [...state.mentor_stack, data] };
      // return state;
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
  SET_NEW_STACK,
  SET_LIKES,
  SET_POINTS,
};
