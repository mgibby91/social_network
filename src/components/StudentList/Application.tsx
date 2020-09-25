import React from "react";
import useApplicationData from "../../hooks/useApplicationData";
import StudentList from './StudentList'

function Application(props) {
  const { state } = useApplicationData();

  const studentXP = state.student_points;

  return (
    <div className="App">
        <StudentList
          students={studentXP}
        />
    </div>
  );
}

export default Application;
