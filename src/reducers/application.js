const SET_POINTS = "SET_POINTS";

// REDUCER INCLUDES SETTING POINTS
export default function reducer(state, action) {
  console.log("state: ", state);
  switch (action.type) {
    case SET_POINTS:
      return { ...state, points: action.points };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export { SET_POINTS };
