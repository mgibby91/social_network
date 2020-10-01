import React from 'react';

export default function RegisterPassword(props) {

  return (
    <div className='register-username-container'>
      <div className="password-title register-title">
        {!props.confirmPassword ? 'Password: ' : 'Confirm Passord: '}
      </div>
      <div className="password-input">
        <input type="password" className='register-input' id='password-input' />
      </div>
      <div className="password-error register-error">

      </div>
    </div>
  )

}