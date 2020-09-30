import React from "react";
import MentorList from "./MentorList";

function Application(props) {
  console.log("props in app mentor: ", props);
  
  const mentors = props.mentors;

  return (
    <div className="App">
      <MentorList 
        mentors={mentors} 
        setSelectedUser={props.setSelectedUser} 
        mentor_stack={props.mentor_stack}
      />
    </div>
  );
}

export default Application;
