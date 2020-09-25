import React from 'react';
import MessageButton from './MessageButton';

export default function MessageHeader(props) {

  let avatar;
  for (let item of props.avatarList) {
    if (item.username === props.username) {
      avatar = item.avatar;
    }
  }

  return (
    <div className='message-text-header'>
      <div className='message-header-username'>
        <img src={avatar} alt="" />
        <div>{props.username}</div>
      </div>
      <div className='message-header-buttons'>
        <div className='tutor-session-title'> Tutor Session: </div>
        <MessageButton name={'Create'} create={true} />
        <MessageButton name={'Complete'} complete={true} />
      </div>
    </div>
  )
}