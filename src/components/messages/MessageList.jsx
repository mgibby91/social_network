import React from 'react';
import MessageItem from './MessageItem';
import '../../styles/messages.css'
import axios from 'axios';

export default function MessageList(props) {

  const messageListObj = props.messageList.messageList;

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

    console.log('hi');
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
    <div>
      {messageData ? messageData : null}
    </div>
  )

}