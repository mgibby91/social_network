import React from 'react';
import MessageItem from './MessageItem';
import '../../styles/messages.css'
import axios from 'axios';

export default function MessageList(props) {

  const messageListObj = props.messageList.messageList;

  console.log('msglistobj', messageListObj);

  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }

  const messageListEmpty = isEmpty(messageListObj);

  let messageData;

  if (!messageListEmpty) {

    messageData = Object.keys(messageListObj).map(messageKey => {
      return <MessageItem
        key={Object.keys(messageListObj).indexOf(messageKey)}
        recentMessage={messageListObj[messageKey][0]}
        username={messageKey}
        clickMe={props.clickMe}
        avatarList={props.avatarList}
      />
    })
  }


  return (
    <div className='message-left-list'>
      {messageData ? messageData : null}
    </div>
  )

}