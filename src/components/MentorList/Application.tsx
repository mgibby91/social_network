import React from "react";
import useApplicationData from "../../hooks/useApplicationData";
import MentorList from './MentorList'

function Application(props) {
  const { state } = useApplicationData();

  const mentorXP = state.mentor_points;

  return (
    <div className="App">
        <MentorList
          mentors={mentorXP}
        />
    </div>
  );
}

export default Application;
