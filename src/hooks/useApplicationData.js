import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_POINTS,
  SET_APPLICATION_DATA,
  SET_SELECTED_USER,
  SET_STUDENT_POINTS,
  SET_MENTOR_POINTS,
  SET_POSTS,
} from "../reducers/application";
export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    comments: {},
    likes: [],
    mentor_stack: [],
    points: 0,
    posts: [],
    student_stack: [],
    tutor_experiences: [],
    user_profiles: [],
    users: [],
    mentor_points: [],
    student_points: [],
    stack_preferences: [],
    posts_stacks: [],
    selected: {},
  });
  // RETRIEVES API AND SETS IT WITH REDUCER
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/comments"),
      axios.get("http://localhost:8001/api/likes"),
      axios.get("http://localhost:8001/api/mentor_stack"),
      axios.get("http://localhost:8001/api/posts"),
      axios.get("http://localhost:8001/api/student_stack"),
      axios.get("http://localhost:8001/api/tutor_experiences"),
      axios.get("http://localhost:8001/api/user_profiles"),
      axios.get("http://localhost:8001/api/users"),
      axios.get("http://localhost:8001/api/mentor_points"),
      axios.get("http://localhost:8001/api/student_points"),
      axios.get("http://localhost:8001/api/stack_preferences"),
      axios.get("http://localhost:8001/api/posts_stacks"),
      // axios.get('http://localhost:8001/api/student_rating/1'),
    ]).then((all) => {
      // console.log("all from applicatin data hook: ", all);
      const comments = all[0].data;
      const likes = all[1].data;
      const mentor_stack = all[2].data;
      const posts = all[3].data;
      const student_stack = all[4].data;
      const tutor_experiences = all[5].data;
      const user_profiles = all[6].data;
      const users = all[7].data;
      const mentor_points = all[8].data;
      const student_points = all[9].data;
      const stack_preferences = all[10].data;
      const posts_stacks = all[11].data;
      const selected = {};
      dispatch({
        type: SET_APPLICATION_DATA,
        comments,
        likes,
        mentor_stack,
        posts,
        student_stack,
        tutor_experiences,
        user_profiles,
        users,
        mentor_points,
        student_points,
        stack_preferences,
        posts_stacks,
        selected,
      });
    });
  }, []);
  // FOR WEBSOCKET
  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    socket.onopen = () => socket.send("ping");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === SET_POINTS) {
        dispatch(data);
      }
    };
    return () => {
      socket.close();
    };
  }, []);
  const addMentorPoints = (mentorID, mentorPoints) => {
    const url = `/api/mentor_points`;
    const promise = axios.put(url, { mentorPoints }).then((req, res) => {
      dispatch({
        type: SET_POINTS,
        points: mentorPoints,
        id: mentorID,
      });
    });
    return promise;
  };
  const addStudentPoints = (studentID, studentPoints) => {
    const url = `/api/mentor_points`;
    const promise = axios.put(url, { studentPoints }).then((req, res) => {
      dispatch({
        type: SET_POINTS,
        points: studentPoints,
        id: studentID,
      });
    });
    return promise;
  };
  const setSelectedUser = (userID) => {
    dispatch({
      type: SET_SELECTED_USER,
      userId: userID,
    });
  };
  const createPost = (postDetails, id) => {
    const post = {
      text_body: postDetails.text,
      active: true,
      owner_id: id,
      time_posted: new Date().toISOString(),
      is_mentor: false,
      is_student: true,
    };
    if (!postDetails.mentor) {
      (post["is_mentor"] = true), (post["is_student"] = false);
    }
    //     const ids = [12, 32, 657, 1, 67];
    // const promises = ids.map((id) => axios.get(`myapi.com/user/${id}`));
    // Promise.all([...promises]).then(function (values) {
    //   console.log(values);
    // });
    const promise = axios
      .post(`http://localhost:8001/api/posts`, { post })
      .then((response, reject) => {
        // console.log("from createPost", response.data);
        dispatch({
          type: SET_POSTS,
          data: post,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return promise;
  };
  return {
    state,
    addMentorPoints,
    addStudentPoints,
    createPost,
    setSelectedUser,
  };
}
