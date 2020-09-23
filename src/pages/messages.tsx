import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/messages.css';
import MessageList from '../components/messages/MessageList';


export default function Messages() {

  const [messageList, setMessageList] = useState({});

  useEffect(() => {

    axios.get('http://localhost:8001/api/messages')
      .then((data) => {
        const currentUserID = data.data.userId;
        const currentData = data.data.data;
        let currentUsername;

        console.log('currentData', currentData);

        for (let item of currentData) {
          if (item.senderid === currentUserID) {
            currentUsername = item.sender;
            break;
          }
          currentUsername = item.receiver;
          break;
        }

        console.log('currentUsername', currentUsername);

        let intMessageList = [];

        for (let obj of currentData) {
          if (obj.senderid === currentUserID) {
            delete obj.senderid;
            delete obj.sender;
          } else {
            delete obj.receiverid;
            delete obj.receiver
          }
          intMessageList.push(obj);
        }

        console.log('intMessageList', intMessageList);

        let msgList = {};

        for (let obj of intMessageList) {
          if (obj.hasOwnProperty('sender')) {
            if (!msgList.hasOwnProperty(obj.sender)) {
              msgList[obj.sender] = [{
                textBody: obj.text_body,
                timeSent: obj.time_sent
              }];
            } else {
              msgList[obj.sender].push({
                textBody: obj.text_body,
                timeSent: obj.time_sent
              });
            }
          } else {
            if (!msgList.hasOwnProperty(obj.receiver)) {
              msgList[obj.receiver] = [{
                textBody: obj.text_body,
                timeSent: obj.time_sent
              }];
            } else {
              msgList[obj.receiver].push({
                textBody: obj.text_body,
                timeSent: obj.time_sent
              });
            }
          }
        }

        console.log('msgList', msgList);

        let dateSortedMsgList = {};

        for (let arr in msgList) {
          msgList[arr].sort((a, b) => {
            return new Date(b.timeSent) - new Date(a.timeSent);
          })
          dateSortedMsgList[arr] = msgList[arr];
        }

        console.log('sortedMsgList', dateSortedMsgList);

      })

  }, []);

  return (
    <div className='main-message-container'>
      <div className='left-message-container'>
        <MessageList />
      </div>
      <div className='right-message-container'>

      </div>
    </div>
  );

}