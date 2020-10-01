import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

function Experience(props) {
  // console.log("props in experience: ", props);
  
  if (!props.user) return {};
  if (!props.mentor) return null;
  if (!props.student) return null;
  
  return (
    <Col breakPoint={{ xs: 6, sm: 6, md: 8, lg: 6 }}>
      {}
      <Row>         
          {props.mentor ? 
            <h4>Mentor Level</h4>
          : ""}
          {props.mentor ? 
            <ProgressBar 
              experience={Number(props.mentor.mentorrating)}
            />
          : ""}
          {props.student ? 
            <h4>Student Level</h4>
          : ""}
          {props.student ? 
            <ProgressBar
              experience={Number(props.student.studentrating)}
            />
          : ""}
      </Row>       
    </Col>
  );
}

export default Experience;
