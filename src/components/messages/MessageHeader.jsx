import React from 'react';
import MessageButton from './MessageButton';

export default function MessageHeader(props) {

  return (
    <div className='message-text-header'>
      <div className='message-header-username'>
        {props.username}
      </div>
      <div className='message-header-buttons'>
        <div className='tutor-session-title'> Tutor Session: </div>
        <MessageButton name={'Create'} create={true} />
        <MessageButton name={'Complete'} complete={true} />
      </div>
    </div>
  )
}