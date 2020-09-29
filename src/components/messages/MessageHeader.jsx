import React from 'react';
import MessageButton from './MessageButton';
import MessageUsernameList from './MessageUsernameList';

export default function MessageHeader(props) {

  console.log('msgHeaderProps', props)

  let avatar;
  for (let item of props.avatarList) {
    if (item.username === props.username) {
      avatar = item.avatar;
    }
  }

  if (props.createNew) {
    avatar = null;
  }

  const yes = 'hiiii';

  return (
    <div className='message-text-header'>
      <div className='message-header-username'>
        <img src={avatar} alt="" />
        <div>{!props.createNew && props.username}</div>
        <div>{props.createNew &&
          <MessageUsernameList
            usernameList={props.avatarList}
          />
        }</div>
      </div>
      <div className='message-header-buttons'>
        <div className='tutor-session-title'> Tutor Session: </div>
        <MessageButton name={'Create'} create={true} />
        <MessageButton name={'Complete'} complete={true} />
      </div>
    </div>
  )
}