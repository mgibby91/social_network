import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

function Experience(props) {
  // console.log("props in experience: ", props);
  
  if (!props.user) return {};
  console.log("user in experience: ", props.user);
  if (!props.mentor) return null;
  console.log("student in experience: ", props.mentor);
  
  if (!props.student) return null;
  console.log("mentor in experience: ", props.student);
  
  
  return (
    <Col breakPoint={{ xs: 6, sm: 6, md: 8, lg: 6 }}>
      {}
      <Row>         
          {props.user.mentorrating ? 
            <h4>Mentor Level</h4>
          : ""}
          {props.user.mentorrating ? 
            <ProgressBar 
              experience={Number(props.user.mentorrating)}
            />
          : ""}
          {props.user.studentrating ? 
            <h4>user.studentrating Level</h4>
          : ""}
          {props.user.studentrating ? 
            <ProgressBar
              experience={Number(props.user.studentrating)}
            />
          : ""}
      </Row>       
    </Col>
  );
}

export default Experience;
