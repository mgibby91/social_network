import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegisterUsername from '../components/Register/RegisterUsername';
import RegisterEmail from '../components/Register/RegisterEmail';
import RegisterPassword from '../components/Register/RegisterPassword';
import RegisterAvatarList from '../components/Register/RegisterAvatarList';
import '../styles/register.css';

export default function Register() {

  const [avatarList, setAvatarList] = useState([]);
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState('');
  const [showAvatarList, setShowAvatarList] = useState(false);

  useEffect(() => {

    axios.get('http://localhost:8001/api/register')
      .then(res => {
        console.log('avatars', res.data);
        console.log('hi');

        const uniqueAvatars = [...new Set(res.data)];
        console.log('uniqueAvatars', uniqueAvatars);

        setAvatarList(uniqueAvatars);
      })

  }, [])


  function selectAvatar(avatarUrl) {
    setSelectedAvatarUrl(avatarUrl);
  }

  function toggleAvatarList() {
    !showAvatarList ? setShowAvatarList(true) : setShowAvatarList(false);
  }


  return (
    <div className='register-main-container'>
      <RegisterUsername />
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
    </div>
  )

}