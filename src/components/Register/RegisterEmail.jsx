import React from 'react';

export default function RegisterEmail(props) {

  return (
    <div className='register-username-container'>
      <div className="email-title register-title">
        Email:
      </div>
      <div className="email-input">
        <input type="email" className='register-input' id='email-input' />
      </div>
      <div className="email-error register-error">

      </div>
    </div>
  )

}