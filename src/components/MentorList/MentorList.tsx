// import "components/MentorList.scss"
import React from "react";
import MentorListItem from "./MentorListItem";

interface IProps {
  mentors: IMentors;
}

interface IMentors {
  [index: number]: { username: string; mentorrating: string };
}

export default function MentorList(props) {
  const { mentors } = props;

  const mentorsData = mentors.map((mentor, index) => {
    return (
      <MentorListItem
        key={index}
        username={mentor.username}
        experience={mentor.mentorrating}
        avatar={mentor.avatar}
        // selected={mentor.id === props.value}
        // setMentor={props.setMentor}
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
