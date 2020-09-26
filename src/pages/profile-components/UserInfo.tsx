import { breakpointUp } from "@paljs/ui/breakpoints";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React, { useState, useEffect } from "react";
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Progress from "@paljs/ui/ProgressBar";
import axios from 'axios';
import {constants} from "buffer";
// interface IUserInfo {
//   user: IUser;
// }

// interface IUser {
//   active: boolean;
//   avatar: string;
//   dob: Date;
//   id: number;
//   is_mentor: boolean;
//   is_student: boolean;
//   location: string;
//   user_id: number;
// }


function UserInfo(props) {
  
  const [state, setState] = useState({
    mentor_points: 0,
    student_points: 0,
  });
  useEffect(() => {
  
    Promise.all([
      axios.get('http://localhost:8001/api/mentor_points'),
      axios.get('http://localhost:8001/api/student_points')
    ]).then((all) => {				
      const mentor_points = all[0].data;
      const student_points = all[1].data;
    
      setState((prev) => ({
        ...prev,
        mentor_points,
        student_points,
      }));
    })
  }, []);	
  
  const mentors = state.mentor_points
  console.log("mentors: ", mentors);
  	

  const mentorKeys =  Object.keys(mentors);

  let mentorRating, 
      username,
      avatar,
      location;

  mentorKeys.map(key => {
    // console.log("mentor: ", mentors[key].mentorrating);
    if (key === "1") {

    mentorRating = Number(mentors[key].mentorrating);
    username = mentors[key].username
    avatar = mentors[key].avatar
    console.log("is mentor: ", username);
    console.log("mentorrating: ", mentorRating);
    }

  });


  const students = state.student_points;
  console.log("students in userinfo: ", students);
  
  const studentKeys =  Object.keys(students);
  let studentRating;
  let is_student = "";
  studentKeys.map(key => {
    // console.log("student: ", students[key].username);
    if (students[key].username === username) {
      studentRating = Number(students[key].studentrating);
      is_student = students[key].username;
    }
    console.log("is student: ", is_student);
    console.log("student rating: ", studentRating);

    
  });

  
  
  

  return (
    <Row>
      <h1>{username}</h1>

      <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <img 
        src={avatar} alt="avatar"/>
      </Col>
      <Col breakPoint={{ xs: 6, sm: 6, md: 8, lg: 6 }}>
        <Row>         
          {username ? 
          <h4>Mentor Level</h4>
          : ""}
          {username ? 
          <ProgressBar 
            experience={mentorRating}
          />
          : ""}
          {is_student ? 
          <h4>Student Level</h4>
          : ""}
          {is_student ? 
          <ProgressBar
            experience={studentRating}
          />
          : ""}
         

          <p>{props.location}</p>
        </Row>       
      </Col>
      <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}></Col>
    </Row>
  );
}

export default UserInfo;
