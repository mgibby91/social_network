import React, { useState } from 'react';

export default function RegisterUsername(props) {

  const [randomUsername, setRandomUsername] = useState('');
  const [usernameValue, setUsernameValue] = useState('');

  function generateRandomUsername() {
    const randomNum = Math.floor(Math.random() * 1000);

    setRandomUsername(props.randomUsernameList[randomNum].name);
    setUsernameValue('');
  }

  function setInputValue(e) {

    setUsernameValue(e.target.value);
    setRandomUsername('');
  }

  function currentInputValue() {
    if (randomUsername) return randomUsername;
    else if (usernameValue) return usernameValue;
    else return '';
  }

  return (
    <div className='register-username-container'>
      <div className="username-title register-title">
        Username:
      </div>
      <div className="username-input">
        <input
          type="text"
          className='register-input'
          id='username-input'
          onChange={(e) => setInputValue(e)}
          value={currentInputValue()}
        />
      </div>
      <div className="username-error register-error">

      </div>
      <div className="username-random-container">
        <div className="username-random-text">
          Or...
        </div>
        <div className="username-random-btn" onClick={() => generateRandomUsername()}>
          Randomly Generate
        </div>
      </div>
    </div>
  );

}