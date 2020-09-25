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

  useEffect(() => {

    const userID = document.cookie.split('=')[1];
    console.log('userID', userID);

    axios.post('http://localhost:8001/api/messages/', { userID })
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

      });

  }, [count]);

  function changeBg(username) {

    const msgUsername = document.querySelectorAll('.message-username');
    let currentEl;

    for (let item of msgUsername) {
      if (item.textContent === username) {
        currentEl = item.parentElement.parentElement;
      }
    }

    const msgTextContainers = document.querySelectorAll('.message-item-container');

    for (let item of msgTextContainers) {
      item.classList.remove('message-list-selected');
    }
    currentEl.classList.add('message-list-selected');
  }


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

    document.querySelector('#msg-textarea').value = '';
    changeBg(username);
  }

  function submitMessage() {

    const textInput = document.querySelector('#msg-textarea').value;
    const receiverID = document.querySelector('.text-container');

    // error handling for if user message feed isn't clicked on
    if (!receiverID) {
      return;
    }

    // error handling for blank inputs
    if (!textInput) {
      const errorContainer = document.querySelector('.error-container');
      errorContainer.style.display = 'block';

      setTimeout(() => {
        errorContainer.style.display = 'none';
      }, 2000);

    } else {
      const senderID = document.cookie.split('=')[1];

      axios.post('http://localhost:8001/api/messages/new', { textInput, receiverID: receiverID.id, senderID })
        .then(() => {
          setCount(count + 1);
          document.querySelector('#msg-textarea').value = '';
        })
    }

  }


  return (
    <div className='main-message-container'>
      <div className='left-message-container'>
        <MessageList
          messageList={messageList}
          clickMe={clickMe}
          username={currentUsername}
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