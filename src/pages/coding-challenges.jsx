import React, { useEffect, useState } from 'react';
import CodingHeader from '../components/CodingChallenges/CodingHeader';
import CodingChallengesContainer from '../components/CodingChallenges/CodingChallengesContainer';
import axios from 'axios';
import '../styles/coding-challenges.css'


export default function CodingChallenges() {

  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [userCompletedChallenges, setUserCompletedChallenges] = useState([]);
  const [allChallenges, setAllChallenges] = useState([]);

  useEffect(() => {

    let userID = document.cookie.split('=')[1];
    if (userID) userID = Number(userID);

    const promiseUserChallenges = axios.get('http://localhost:8001/api/user_challenges');
    const promiseUserInfo = axios.post('http://localhost:8001/api/login', { userID });
    const promiseAllChallenges = axios.get('http://localhost:8001/api/challenges/all');

    Promise.all([promiseUserChallenges, promiseUserInfo, promiseAllChallenges])
      .then(all => {

        let [userChallengeData, userInfo, allChallenges] = all;

        userChallengeData = userChallengeData.data;
        userInfo = userInfo.data;
        allChallenges = allChallenges.data;
        // console.log('userChallengeData', userChallengeData);
        // console.log('userInfo', userInfo);
        // console.log('allChallenges', allChallenges);
        // console.log('userID', userID);

        // completed and userID
        const filteredChallengeData = userChallengeData.filter(challenge => {
          return challenge.user_id === userID && challenge.completed;
        });
        // console.log('filteredChallengeData', filteredChallengeData);
        setUserCompletedChallenges(filteredChallengeData);
        setCurrentUserInfo(userInfo[0]);
        setAllChallenges(allChallenges);
      });

  }, []);

  return (
    <div className='coding-challenges-main-container'>
      <CodingHeader
        userInfo={currentUserInfo}
        completedChallenges={userCompletedChallenges}
      />
      <CodingChallengesContainer
        allChallenges={allChallenges}
        completedChallenges={userCompletedChallenges}
      />
    </div>
  );

}