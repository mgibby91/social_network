// import "components/studentList.scss"
import React from "react";
import StudentListItem from "./StudentListItem";

export default function StudentList(props) {
	
	const { students } = props;
	
  const studentsData = students.map((student, index) => {
    return (
      <StudentListItem
        key={index}
        username={student.username}
        experience={student.studentrating}
        avatar={student.avatar}
        // selected={student.id === props.value}
        // setstudent={props.setstudent}
      />
    );
  });
  return (
    <section>
      <h1>Students</h1>
      <ul>{studentsData}</ul>
    </section>
  );
}
