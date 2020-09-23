import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, { SET_POINTS,  SET_APPLICATION_DATA } from "../reducers/application";

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
    mentor_points: 0,
    student_points: 0,  
  });

    // RETRIEVES API AND SETS IT WITH REDUCER
    useEffect(() => {
      Promise.all([
        axios.get("/api/comments"),
        axios.get("/api/likes"),
        axios.get("/api/mentor_stack"),
        axios.get("/api/posts"),
        axios.get("/api/student_stack"),
        axios.get("/api/tutor_experiences"),
        axios.get("/api/user_profiles"),
        axios.get("/api/users"),
        axios.get("/api/user_profiles/mentor_points/:id"),
        axios.get("/api/user_profiles/student_points/:id"),
  
      ]).then((all) => {
        console.log("all from user_profiles: ", all);
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
        });
      });
    }, []);

    console.log("state in hook: ", state);
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

  const addPoints = (points) => {
    const url = `/api/points`;
    const promise = axios.put(url, { points }).then((res) => {
      dispatch({
        type: SET_POINTS,
        points: res.data.points,
      });
    });
    return promise;
  };

  return { state, addPoints };
}
