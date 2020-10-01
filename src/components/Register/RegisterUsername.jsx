import React from 'react';

export default function RegisterUsername(props) {

  return (
    <div className='register-username-container'>
      <div className="username-title register-title">
        Username:
      </div>
      <div className="username-input">
        <input type="text" className='register-input' id='email-input' />
      </div>
      <div className="username-error register-error">

      </div>
      <div className="username-random-container">
        <div className="username-random-text">
          Or...
        </div>
        <div className="username-random-btn">
          Randomly Generate
        </div>
      </div>
    </div>
  );

}