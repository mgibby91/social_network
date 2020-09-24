import React from 'react';

export default function MessageHeader(props) {

  return (
    <div className='message-text-header'>
      {props.username}
    </div>
  )
}