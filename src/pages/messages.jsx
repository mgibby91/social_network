import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/messages.css';
import MessageList from '../components/messages/MessageList';
import messageCleanSort from '../helpers/messageHelpers';


export default function Messages() {

  const [messageList, setMessageList] = useState({});

  console.log('messageList', messageList);

  useEffect(() => {

    axios.get('http://localhost:8001/api/messages')
      .then((data) => {
        const currentUserID = data.data.userId;
        const currentData = data.data.data;

        const newMessageList = messageCleanSort(currentUserID, currentData);

        console.log('newMessageList', newMessageList);

        setMessageList({ messageList: newMessageList });

        let usernames = [];

        for (let message in newMessageList) {
          usernames.push(message)
        }

      })

  }, []);

  return (
    <div className='main-message-container'>
      <div className='left-message-container'>
        <MessageList
          messageList={messageList}
        />
      </div>
      <div className='right-message-container'>

      </div>
    </div>
  );

}