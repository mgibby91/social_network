import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/messages.css';
import '../../styles/tutor-sessions.css'
import MessageList from './MessageList';
import MessageView from './MessageView';
import MessageHeader from './MessageHeader';
import MessageTextArea from './MessageTextArea';
import MessageListHeader from './MessageListHeader';
import MessageTutorCreate from './MessageTutorCreate';
import messageCleanSort from '../../helpers/messageHelpers';

export default function Messages() {

  const [messageList, setMessageList] = useState({});
  const [currentData, setCurrentData] = useState([]);
  const [count, setCount] = useState(0);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentUsername, setCurrentUsername] = useState('');
  const [avatars, setAvatars] = useState([]);
  const [createNew, setCreateNew] = useState(false);
  const [showTutor, setShowTutor] = useState(false);

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

        if (currentUsername) {
          changeBg(currentUsername);
        }

      });

  }, [count, currentUsername]);

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
      selectedUsername = document.querySelector('#search-user-input').value;
    }

    console.log('selectedUsername', selectedUsername);

    const textInput = document.querySelector('#msg-textarea').value;

    let receiverID;

    if (!createNew) {
      receiverID = document.querySelector('.text-container').id;
    } else {
      for (let user of avatars) {
        if (user.username === selectedUsername) {
          receiverID = user.id;
        }
      }
    }

    console.log('receiverID', receiverID);

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

      axios.post('http://localhost:8001/api/messages/new', { textInput, receiverID, senderID })
        .then(() => {
          if (createNew) {
            setCurrentUsername(selectedUsername);
            setTimeout(() => {
              changeBg(selectedUsername);
            }, 20);
          }
          console.log('hi');
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

  // CREATE TUTOR SESSION STUFF ***************************************

  function displayCreateTutorSession() {
    setShowTutor(true);
  }

  function createTutorSession() {
    const radios = document.getElementsByName('radio-mentor-student');
    let radioChecked;
    for (let radio of radios) {
      if (radio.checked) {
        radioChecked = radio.id;
      }
    }

    const username = document.querySelector('#search-user-input').value;
    let receiverID;
    for (let user of avatars) {
      if (user.username === username) {
        receiverID = user.id;
      }
    }
    const creatorID = Number(document.cookie.split('=')[1]);

    let mentorID, studentID;
    if (radioChecked === 'mentor') {
      mentorID = receiverID
      studentID = creatorID;
    } else {
      mentorID = creatorID;
      studentID = receiverID;
    }

    axios.post('http://localhost:8001/api/tutor_experiences/new', { mentorID, studentID, creatorID })
      .then(() => {
        setShowTutor(false);
        setCount(count + 1);
      })
  }

  // CREATE TUTOR SESSION STUFF ***************************************


  return (
    <div className="outside-main-message">
      {showTutor && (
        <MessageTutorCreate
          avatarList={avatars}
          createTutorSession={createTutorSession}
        />
      )}
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
            displayCreateTutorSession={displayCreateTutorSession}
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
    </div>
  );

}