import React, { useEffect, useState } from 'react';
import '../../src/styles/tutor-sessions.css';
import TutorHistory from '../components/TutorSessions/TutorHistory';
import TutorCreate from '../components/TutorSessions/TutorCreate';
import TutorRate from '../components/TutorSessions/TutorRate';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import { sortFilterAllTutorData } from '../helpers/tutor-helpers';

import axios from 'axios';

export default function TutorSessions() {

  const loggedInUserID = Number(document.cookie.split('=')[1]);

  const [currentTutorData, setCurrentTutorData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState([]);
  const [count, setCount] = useState(0);
  const [rateTutor, setRateTutor] = useState(false);
  const [currentTutorID, setCurrentTutorID] = useState(0);
  const [otherUsername, setOtherUsername] = useState(null);

  useEffect(() => {

    const promiseTutor = axios.get('http://localhost:8001/api/tutor_experiences');
    const promiseUser = axios.get('http://localhost:8001/api/users');

    Promise.all([promiseTutor, promiseUser])
      .then(all => {
        console.log(all);

        const [tutorData, userData] = all;

        const cleanTutorData = sortFilterAllTutorData(tutorData.data, loggedInUserID);

        console.log('cleanTutorData', cleanTutorData);

        setCurrentTutorData(cleanTutorData);
        setCurrentUserData(userData.data);

        setRateTutor(false);
      })

  }, [count]);

  function acceptAction(tutorSessionID) {

    axios.put('http://localhost:8001/api/tutor_experiences/accept', { tutorSessionID })
      .then(() => {
        setCount(count + 1);
      })
  }

  function declineCancelAction(tutorSessionID) {

    axios.put('http://localhost:8001/api/tutor_experiences/delete', { tutorSessionID })
      .then((res) => {
        setCount(count + 1);
      })
  }

  function completeAction(tutorSessionID, otherUsername) {

    setRateTutor(true);
    setCurrentTutorID(tutorSessionID);
    setOtherUsername(otherUsername);

  }

  function submitRating(tutorSessionID, isMentor, rating, comments) {

    axios.put('http://localhost:8001/api/tutor_experiences/complete', { tutorSessionID, isMentor, rating, comments })
      .then(() => {
        setCount(count + 1);
      })
  }


  function createTutorSession() {
    const radios = document.getElementsByName('radio-mentor-student');
    let radioChecked;
    for (let radio of radios) {
      if (radio.checked) {
        radioChecked = radio.id;
      }
    }

    const receiverID = Number(document.querySelector('#tutor-username-list').selectedOptions[0].id);
    const creatorID = Number(document.cookie.split('=')[1]);

    let mentorID, studentID;
    if (radioChecked === 'mentor') {
      mentorID = receiverID
      studentID = creatorID;
    } else {
      mentorID = creatorID;
      studentID = receiverID;
    }

    axios.post('http://localhost:8001/api/tutor_experiences/new', { mentorID, studentID, creatorID })
      .then(res => {
        console.log(res);
        setCount(count + 1);
      })

  }

  return (
    <div className='main-tutor-container'>
      <TutorCreate
        currentUserData={currentUserData}
        createTutorSession={createTutorSession}
      />
      {rateTutor && (
        <TutorRate
          currentTutorID={currentTutorID}
          currentUserData={currentUserData}
          currentTutorData={currentTutorData}
          submitRating={submitRating}
          otherUsername={otherUsername}
        />
      )}
      <TutorHistory
        currentTutorData={currentTutorData}
        currentUserData={currentUserData}
        acceptAction={acceptAction}
        declineCancelAction={declineCancelAction}
        completeAction={completeAction}
      />
    </div>
  );

}