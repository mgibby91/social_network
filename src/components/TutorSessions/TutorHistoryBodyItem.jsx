import React from 'react';
import TutorBtn from './TutorBtn';
import timeSince from '../../helpers/timeSince';

export default function TutorHistoryBodyItem(props) {

  console.log('tutorHistoryBodyItem', props);

  function getDateStatus(props) {
    let dateStatus;

    if (props.dateCompleted) dateStatus = 'Completed';
    else if (props.dateAccepted) dateStatus = 'Accepted';
    else dateStatus = 'Initiated';

    return dateStatus;
  }

  function getTimeAgo(props) {
    let currentDate;

    if (props.dateCompleted) currentDate = props.dateCompleted;
    else if (props.dateAccepted) currentDate = props.dateAccepted;
    else currentDate = props.dateInitiated;

    return currentDate;

  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  function getMentorUsername(props) {
    let mentorUsername;

    for (let user of props.currentUserData) {
      if (user.id === props.mentorID) {
        mentorUsername = user.username;
      }
    }

    return mentorUsername;
  }

  function getStudentUsername(props) {
    let studentUsername;

    for (let user of props.currentUserData) {
      if (user.id === props.studentID) {
        studentUsername = user.username;
      }
    }

    return studentUsername;
  }


  return (
    <div className='tutor-history-item-container'>
      <div className="tutor-history-item-date">
        <div className="item-date-status">
          {getDateStatus(props)}: <strong>{formatDate(getTimeAgo(props))}</strong>
        </div>
        <div className="item-date-date">
          ({timeSince(getTimeAgo(props))} ago)
        </div>
      </div>
      <div className="tutor-history-item-student-mentor">
        {getMentorUsername(props)} / {getStudentUsername(props)}
      </div>
      <div className="tutor-history-item-status">
        Pending...
      </div>
      <div className="tutor-history-item-btns">
        <TutorBtn

        />
      </div>
    </div>
  );

}