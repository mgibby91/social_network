import React from "react";
import useApplicationData from "../../hooks/useApplicationData";
import MentorList from './MentorList'

function Application(props) {
  const { state } = useApplicationData();
  
  const mentorXP = state.mentors;
  console.log("mentor xp in mentorlist: ", mentorXP);
  
  return (
    <div className="App">
        <MentorList
          mentors={mentorXP}
        />
    </div>
  );
}

export default Application;
