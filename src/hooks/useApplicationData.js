import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, { SET_POINTS } from "../reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    points: 0,
  });

  const setPoints = (points) => dispatch({ type: SET_POINTS, points });

  // RETRIEVES API AND SETS IT WITH REDUCER
  useEffect(() => {
    Promise.all([axios.get("/api/points")]).then((all) => {
      const points = all[0].data;

      dispatch({
        type: SET_POINTS,
        points: points[0].points,
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

  return { state, setPoints, addPoints };
}
