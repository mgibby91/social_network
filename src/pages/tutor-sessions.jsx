import React, { useEffect, useState } from 'react';
import '../../src/styles/tutor-sessions.css';
import TutorHistory from '../components/TutorSessions/TutorHistory';
import TutorCreate from '../components/TutorSessions/TutorCreate';
import TutorRate from '../components/TutorSessions/TutorRate';
import TutorFilter from '../components/TutorSessions/TutorFilter';
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
  const [unratedSession, setUnratedSession] = useState(null);
  const [cancelDecline, setCancelDecline] = useState(false);
  const [tutorSessionID, setTutorSessionID] = useState(0);
  const [filterStatus, setFilterStatus] = useState('');
  const [selectFilterBtn, setSelectFilterBtn] = useState('');
  const [createError, setCreateError] = useState('');

  console.log('unratesSession', unratedSession);

  useEffect(() => {

    const promiseTutor = axios.get('http://localhost:8001/api/tutor_experiences');
    const promiseUser = axios.get('http://localhost:8001/api/users');

    Promise.all([promiseTutor, promiseUser])
      .then(all => {
        console.log(all);

        const [tutorData, userData] = all;

        let cleanTutorData = sortFilterAllTutorData(tutorData.data, loggedInUserID);

        if (filterStatus === 'pending' || filterStatus === 'in-progress' || filterStatus === 'completed') {
          cleanTutorData = cleanTutorData.filter(session => session.status === filterStatus);
        }

        console.log('cleanTutorData', cleanTutorData);
        console.log('loggedInUser', loggedInUserID);

        // rate session before it completes on unrated side
        for (let session of cleanTutorData) {
          if (session.mentor_id === loggedInUserID && session.mentor_rating === null && session.status === "completed") {
            // setUnratedSession(session);
            console.log('session', session);
            setUnratedSession(session);
            const index = cleanTutorData.indexOf(session);
            cleanTutorData.splice(index, 1);
          }
          if (session.student_id === loggedInUserID && session.student_rating === null && session.status === "completed") {
            // setUnratedSession(session);
            console.log('session', session);
            setUnratedSession(session);
            const index = cleanTutorData.indexOf(session);
            cleanTutorData.splice(index, 1);
          }
        }

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

    setCancelDecline(true);
    setTutorSessionID(tutorSessionID);

  }

  function cancelConfirmDelete() {
    setCancelDecline(false);
    setTutorSessionID(0);
  }

  function confirmConfirmDelete(tutorSessionID) {

    axios.put('http://localhost:8001/api/tutor_experiences/delete', { tutorSessionID })
      .then(() => {
        setCancelDecline(false);
        setTutorSessionID(0);
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

  function otherUserSubmitRating(unratedTutorSession, rating, comments) {
    console.log('urts', unratedTutorSession);
    console.log('r', rating);
    console.log('c', comments);

    const tutorSessionID = unratedTutorSession.id;

    let isMentorRating;
    if (!unratedTutorSession.mentor_rating) {
      isMentorRating = true;
    } else {
      isMentorRating = false;
    }

    axios.put('http://localhost:8001/api/tutor_experiences/complete-other', { isMentorRating, rating, comments, tutorSessionID })
      .then((res) => {
        console.log('updatedRes', res)
        setUnratedSession(null);
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

    const username = document.querySelector('#search-user-input').value;

    // error handling for no input
    if (!username) {
      setCreateError('username');

      setTimeout(() => {
        setCreateError('');
      }, 2000);

      return;
    }

    let receiverID;
    console.log('currentTutorData', currentUserData);
    for (let user of currentUserData) {
      if (user.username === username) {
        receiverID = user.id;
      }
    }
    console.log('username', username);
    console.log('receiverID', receiverID);
    const creatorID = Number(document.cookie.split('=')[1]);

    let mentorID, studentID;
    if (radioChecked === 'mentor') {
      mentorID = receiverID
      studentID = creatorID;
    } else {
      mentorID = creatorID;
      studentID = receiverID;
    }

    // error handling for username not present
    if (!receiverID) {
      setCreateError('username');

      setTimeout(() => {
        setCreateError('');
      }, 2000);
      return;
    } else {
      axios.post('http://localhost:8001/api/tutor_experiences/new', { mentorID, studentID, creatorID })
        .then(() => {
          setCount(count + 1);
          document.querySelector('#search-user-input').value = '';
        })
    }

  }

  // Cancel rate tutor session 
  function cancelRateSession() {
    setRateTutor(false);
  }

  // FILTER STATUS *************************************************
  function sortByStatus(status) {

    setSelectFilterBtn(status);

    status = status.toLowerCase();
    console.log('hi status', status);
    setFilterStatus(status);
    setCount(count + 1);

  }


  // FILTER STATUS *************************************************


  return (
    <div className='main-tutor-container'>
      <TutorCreate
        currentUserData={currentUserData}
        createTutorSession={createTutorSession}
        createError={createError}
      />
      {(rateTutor || unratedSession) && (
        <TutorRate
          currentTutorID={currentTutorID}
          currentUserData={currentUserData}
          currentTutorData={currentTutorData}
          submitRating={submitRating}
          otherUsername={otherUsername}
          unratedSession={unratedSession}
          otherUserSubmitRating={otherUserSubmitRating}
          cancelRateSession={cancelRateSession}
        />
      )}
      <TutorFilter
        sortByStatus={sortByStatus}
        selectFilterBtn={selectFilterBtn}
      />
      <TutorHistory
        currentTutorData={currentTutorData}
        currentUserData={currentUserData}
        acceptAction={acceptAction}
        declineCancelAction={declineCancelAction}
        completeAction={completeAction}
        cancelDecline={cancelDecline}
        cancelConfirmDelete={cancelConfirmDelete}
        confirmConfirmDelete={confirmConfirmDelete}
        tutorSessionID={tutorSessionID}
      />
    </div>
  );

}