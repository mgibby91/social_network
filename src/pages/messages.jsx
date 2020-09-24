import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/messages.css';
import MessageList from '../components/messages/MessageList';
import MessageView from '../components/messages/MessageView';
import MessageHeader from '../components/messages/MessageHeader';
import MessageTextArea from '../components/messages/MessageTextArea';
import messageCleanSort from '../helpers/messageHelpers';


export default function Messages() {

  const [messageList, setMessageList] = useState({});
  const [currentData, setCurrentData] = useState([]);

  console.log('messageList', messageList);
  console.log('currentData', currentData);

  useEffect(() => {

    axios.get('http://localhost:8001/api/messages')
      .then((data) => {
        const currentUserID = data.data.userId;
        const currentData = data.data.data;

        setCurrentData(currentData);

        const newMessageList = messageCleanSort(currentUserID, currentData);

        setMessageList({ messageList: newMessageList });

        let usernames = [];

        for (let message in newMessageList) {
          usernames.push(message)
        }

      })

  }, []);

  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentUsername, setCurrentUsername] = useState('');

  function clickMe(username) {
    setCurrentUsername(username);

    let intMessages = [];

    for (let msg of currentData) {
      if (msg.sender === username || msg.receiver === username) {
        intMessages.push(msg);
      }
    }

    intMessages.sort((a, b) => new Date(a.time_sent) - new Date(b.time_sent))
    setCurrentMessages(intMessages);
  }

  function submitMessage() {

  }


  return (
    <div className='main-message-container'>
      <div className='left-message-container'>
        <MessageList
          messageList={messageList}
          clickMe={clickMe}
        />
      </div>
      <div className='right-message-container'>
        <MessageHeader
          username={currentUsername}
        />
        <MessageView
          currentMessages={currentMessages}
        />
        <MessageTextArea
          submitMessage={submitMessage}
        />
      </div>
    </div>
  );

}