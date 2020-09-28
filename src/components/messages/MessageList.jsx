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

  let sortable = [];
  for (let obj in messageListObj) {
    sortable.push([obj, messageListObj[obj]]);
  }

  const sortedMessageList = sortable.sort((a, b) => {
    return new Date(b[1][0].timeSent) - new Date(a[1][0].timeSent);
  });

  console.log('sortedMessageList', sortedMessageList)

  console.log('sortable', sortable);

  let messageData;

  if (!messageListEmpty) {

    messageData = sortedMessageList.map((message, index) => {
      return <MessageItem
        key={sortedMessageList.indexOf(message)}
        recentMessage={message[1][0]}
        username={message[0]}
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