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
  const [count, setCount] = useState(0);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentUsername, setCurrentUsername] = useState('');

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

        const username = document.querySelector('.message-header-username').textContent;

        let intMessages = [];

        for (let msg of currentData) {
          if (msg.sender === username || msg.receiver === username) {
            intMessages.push(msg);
          }
        }

        intMessages.sort((a, b) => new Date(b.time_sent) - new Date(a.time_sent))
        setCurrentMessages(intMessages);


      })

  }, [count]);


  function clickMe(username) {
    setCurrentUsername(username);

    let intMessages = [];

    for (let msg of currentData) {
      if (msg.sender === username || msg.receiver === username) {
        intMessages.push(msg);
      }
    }

    intMessages.sort((a, b) => new Date(b.time_sent) - new Date(a.time_sent))
    setCurrentMessages(intMessages);

  }

  function submitMessage(username) {

    console.log('username', username);

    const textInput = document.querySelector('#msg-textarea').value;
    const receiverID = Number(document.querySelector('.text-container').id);

    console.log('userID', receiverID);

    axios.post('http://localhost:8001/api/messages/new', { textInput, receiverID })
      .then((res) => {
        console.log('new message res', res);
        setCount(count + 1);
      })

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
          username={currentUsername}
        />
      </div>
    </div>
  );

}