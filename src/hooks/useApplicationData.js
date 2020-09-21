import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, { SET_POINTS } from "../reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    points: Number,
  });

  const setPoints = (points) => dispatch({ type: SET_POINTS, points });

  // RETRIEVES API AND SETS IT WITH REDUCER
  useEffect(() => {
    Promise.all([axios.get("/api/points")]).then((all) => {
      const points = all[0].data;
      dispatch({
        type: SET_POINTS,
        points,
      });
    });
  }, []);

  // FOR WEBSOCKET
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8001");

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

  return { state, setPoints };
}
