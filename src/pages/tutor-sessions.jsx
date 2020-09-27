import React, { useEffect, useState } from 'react';
import '../../src/styles/tutor-sessions.css';
import TutorHistory from '../components/TutorSessions/TutorHistory';
import { sortFilterAllTutorData } from '../helpers/tutor-helpers';
import axios from 'axios';

export default function TutorSessions() {

  const loggedInUserID = Number(document.cookie.split('=')[1]);

  const [currentTutorData, setCurrentTutorData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState([]);

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
      })

  }, [])

  return (
    <div className='main-tutor-container'>
      <TutorHistory
        currentTutorData={currentTutorData}
        currentUserData={currentUserData}
      />
    </div>
  );

}