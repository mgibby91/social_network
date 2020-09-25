import React from "react";
import ProgressBar from "../components/Button";
import { Button } from '@paljs/ui/Button';
import useApplicationData from "../hooks/useApplicationData";

const testData = [
  { bgcolor: "#6a1b9a", completed: 60 },
  { bgcolor: "#00695c", completed: 30 },
  { bgcolor: "#ef6c00", completed: 53 },
];

const addPoints = (data) => {
  data.map((item) => {
    console.log(item.completed);
    item.completed++;
  });
};

function Home() {

  return (
    <div className="App">
      {testData.map((item, idx) => (
        <ProgressBar
          key={idx}
          bgcolor={item.bgcolor}
          completed={item.completed}
        />
      ))}
      <Button onClick={() => addPoints(testData)}>Completed task</Button>
    </div>
  );
}

export default Home;
