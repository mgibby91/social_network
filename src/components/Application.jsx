import React from "react";
import ProgressBar from "./ProgressBar/ProgressBar";
import useApplicationData from "../hooks/useApplicationData";

const testData = [{ bgcolor: "#6a1b9a" }];

function Application(props) {
  const { state, addPoints } = useApplicationData();


  console.log("state: ", props);
  const points = state.points;

  return (
    <div className="App">
      {testData.map((item, idx) => (
        <ProgressBar
          key={idx}
          bgcolor={item.bgcolor}
          points={points}
          addPoints={addPoints}
        />
      ))}
    </div>
  );
}

export default Application;
