import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegisterUsername from '../components/Register/RegisterUsername';
import RegisterEmail from '../components/Register/RegisterEmail';
import RegisterPassword from '../components/Register/RegisterPassword';
import RegisterAvatarList from '../components/Register/RegisterAvatarList';
import '../styles/register.css';

export default function Register() {

  const [avatarList, setAvatarList] = useState([]);
  const [randomUsernameList, setRandomUsernameList] = useState([]);
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState('');
  const [showAvatarList, setShowAvatarList] = useState(false);

  useEffect(() => {

    const promiseAvatars = axios.get('http://localhost:8001/api/register/avatars');
    const promiseRandomUsernames = axios.get('http://localhost:8001/api/register/random_usernames')

    Promise.all([promiseAvatars, promiseRandomUsernames])
      .then(all => {

        const [avatarData, randomUsernameData] = all;

        console.log('random username data', randomUsernameData);
        console.log('avatar data', avatarData);

        const uniqueAvatars = [...new Set(avatarData.data)];
        const uniqueRandomUsernames = [...new Set(randomUsernameData.data)];

        setAvatarList(uniqueAvatars);
        setRandomUsernameList(uniqueRandomUsernames);
      })

  }, [])


  function selectAvatar(avatarUrl) {
    setSelectedAvatarUrl(avatarUrl);
  }

  function toggleAvatarList() {
    !showAvatarList ? setShowAvatarList(true) : setShowAvatarList(false);
  }

  // ERROR HANDLING



  return (
    <div className='register-main-container'>
      <RegisterUsername
        randomUsernameList={randomUsernameList}
      />
      <RegisterEmail />
      <RegisterPassword
        confirmPassword={false}
      />
      <RegisterPassword
        confirmPassword={true}
      />
      <RegisterAvatarList
        avatarList={avatarList}
        selectAvatar={selectAvatar}
        selectedAvatarUrl={selectedAvatarUrl}
        toggleAvatarList={toggleAvatarList}
        showAvatarList={showAvatarList}
      />
      <div className="register-btn">
        REGISTER
      </div>
    </div>
  )

}