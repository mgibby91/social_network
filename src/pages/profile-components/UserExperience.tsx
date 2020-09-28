import { breakpointUp } from "@paljs/ui/breakpoints";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React, { useState, useEffect } from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

function Experience(props) {
  let is_mentor;
  props.mentor.map((mentor) => {
    if (mentor.mentor_id === props.userId)
    is_mentor = mentor
  });

  
  let is_student;
  props.mentor.map((student) => {
    if (student.student_id === props.userId)
    is_student = student
  });


  return (
    <Col breakPoint={{ xs: 6, sm: 6, md: 8, lg: 6 }}>
      {}
      <Row>         
          {is_mentor ? 
            <h4>Mentor Level</h4>
          : ""}
          {is_mentor ? 
            <ProgressBar 
              experience={is_mentor.mentorrating}
            />
          : ""}
          {is_student ? 
            <h4>Student Level</h4>
          : ""}
          {is_student ? 
            <ProgressBar
              experience={is_student.studentrating}
            />
          : ""}
      </Row>       
    </Col>
  );
}

export default Experience;
