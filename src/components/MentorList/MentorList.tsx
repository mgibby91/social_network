// import "components/MentorList.scss"
import React from "react";
import MentorListItem from "./MentorListItem";
import { getStack } from "../../helpers/profileHelpers";

interface IProps {
  mentors: IMentors;
}

interface IMentors {
  [index: number]: { username: string; mentorrating: string };
}

interface IStack {
  [index: number]: { id: number, user_id: number, name: string }
}

export default function MentorList(props) {
  const { mentors } = props;
  console.log("props in mentor list: ", props.mentor_stack);
  
  const mentorsData = mentors.map((mentor, index) => {

    console.log("mentor in list: ", mentor);
    
    return (
      <MentorListItem
        key={index}
        userId={mentor.mentor_id}
        username={mentor.username}
        experience={mentor.mentorrating}
        avatar={mentor.avatar}
        setSelectedUser={props.setSelectedUser}
        active={mentor.active}
        mentor_stack={props.mentor_stack}
      />
    );
  });
  return (
    <section>
      <h1>Mentors</h1>
      <ul>{mentorsData}</ul>
    </section>
  );
}
