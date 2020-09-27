import React from "react";
import StudentList from './StudentList'

function Application(props) {

  const students = props.students;

  return (
    <div className="App">
        <StudentList
          students={students}
          setSelectedUser={props.setSelectedUser}
        />
    </div>
  );
}

export default Application;
