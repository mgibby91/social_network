// import "components/studentList.scss"
import React from "react";
import StudentListItem from "./StudentListItem";

export default function StudentList(props) {
  const { students } = props;
  
  const studentsData = students.map((student, index) => {
    return (
      <StudentListItem
        key={index}
        userId={student.student_id}
        username={student.username}
        experience={student.studentrating}
        avatar={student.avatar}
        setSelectedUser={props.setSelectedUser}
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
