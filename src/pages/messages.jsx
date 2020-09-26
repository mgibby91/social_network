import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/messages.css';
import MessageList from '../components/messages/MessageList';
import MessageView from '../components/messages/MessageView';
import MessageHeader from '../components/messages/MessageHeader';
import MessageTextArea from '../components/messages/MessageTextArea';
import MessageListHeader from '../components/messages/MessageListHeader';
import messageCleanSort from '../helpers/messageHelpers';

export default function Messages() {

  const [messageList, setMessageList] = useState({});
  const [currentData, setCurrentData] = useState([]);
  const [count, setCount] = useState(0);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentUsername, setCurrentUsername] = useState('');
  const [avatars, setAvatars] = useState([]);
  const [createNew, setCreateNew] = useState(false);

  useEffect(() => {

    const userID = document.cookie.split('=')[1];

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

  useEffect(() => {
    axios.get('http://localhost:8001/api/user_profiles')
      .then(res => {
        console.log('user_profilesData', res.data);
        setAvatars(res.data);
      })
  }, [])

  function changeBg(username, deselectBG) {

    const msgUsername = document.querySelectorAll('.message-username');
    console.log('msgUsername', msgUsername);
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

    if (!deselectBG && currentEl) {
      currentEl.classList.add('message-list-selected');
    }
  }


  function clickMe(username) {
    setCreateNew(false);
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

    let selectedUsername;

    if (createNew) {
      selectedUsername = document.querySelector('#username-list-data').selectedOptions[0].textContent;
    }

    const textInput = document.querySelector('#msg-textarea').value;

    let receiverID;

    if (!createNew) {
      receiverID = document.querySelector('.text-container');
    } else {
      receiverID = document.querySelector('#username-list-data').selectedOptions[0];
    }

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
          if (createNew) {
            setCurrentUsername(selectedUsername);
            setTimeout(() => {
              changeBg(selectedUsername);
            }, 20);
          }
          setCount(count + 1);
          document.querySelector('#msg-textarea').value = '';


          setCreateNew(false);
        })
    }

  }

  function createNewMsg() {
    setCreateNew(true);
    changeBg(currentUsername, true);
  }


  return (
    <div className='main-message-container'>
      <div className='left-message-container'>
        <MessageListHeader
          createNewMsg={createNewMsg}
        />
        <MessageList
          messageList={messageList}
          clickMe={clickMe}
          username={currentUsername}
          avatarList={avatars}
        />
      </div>
      <div className='right-message-container'>
        <MessageHeader
          username={currentUsername}
          avatarList={avatars}
          createNew={createNew}
        />
        <MessageView
          currentMessages={currentMessages}
          createNew={createNew}
        />
        <MessageTextArea
          submitMessage={submitMessage}
          username={currentUsername}
        />
      </div>
    </div>
  );

}