const SET_POINTS = "SET_POINTS";

const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_MENTOR_POINTS = "SET_MENTOR_POINTS";
const SET_STUDENT_POINTS = "SET_STUDENT_POINTS";
const SET_POSTS = "SET_POSTS";
// REDUCER INCLUDES SETTING POINTS
export default function reducer(state, action) {
  switch (action.type) {
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
      };

    case SET_MENTOR_POINTS:
      return { ...state, mentor: action.id, points: action.points };

    case SET_STUDENT_POINTS:
      return { ...state, student: action.id, points: action.points };

    case SET_POSTS:
      console.log(action.posts);
      return { ...state, posts: action.posts };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export {
  SET_POINTS,
  SET_APPLICATION_DATA,
  SET_MENTOR_POINTS,
  SET_STUDENT_POINTS,
  SET_POSTS,
};
