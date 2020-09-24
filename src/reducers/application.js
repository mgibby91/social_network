const SET_POINTS = "SET_POINTS";

const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
// REDUCER INCLUDES SETTING POINTS
export default function reducer(state, action) {
  switch (action.type) {
    case SET_POINTS:
      return { ...state, points: action.points };

    case SET_APPLICATION_DATA:
      console.log("action in reducer: ", action);
      const {
        comments,
        mentor_stack,
        likes,
        messages,
        posts,
        student_stack,
        tutor_experiences,
        user_profiles,
        users,
      } = action;
      
      return {
        ...state,
        comments,
        mentor_stack,
        likes,
        messages,
        posts,
        student_stack,
        tutor_experiences,
        user_profiles,
        users,
      };
      
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export { SET_POINTS, SET_APPLICATION_DATA };
