import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

function Experience(props) {
  // console.log("props in experience: ", props);

  if (!props.user) return {};
  console.log("user in experience: ", props.user.studentrating);

  return (
        <div>
          {props.user.mentorrating ? 
            <h4>Mentor Level</h4>
          : ""}
          {props.user.mentorrating ? 
            <ProgressBar 
              experience={Number(props.user.mentorrating)}
            />
          : ""}
          {props.user.studentrating ? 
            <h4>Student Level</h4>
          : ""}
          {props.user.studentrating ? 
            <ProgressBar
              experience={Number(props.user.studentrating)}
            />
          : ""}

        </div>    
  );
}

export default Experience;
