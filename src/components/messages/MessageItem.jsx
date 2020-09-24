import React from 'react';
import timeSince from '../../helpers/timeSince';

export default function MessageItem(props) {

  const firstInitial = props.username[0].toUpperCase();

  let messageBody;
  if (props.recentMessage.textBody.length > 25) {
    messageBody = props.recentMessage.textBody.slice(0, 25) + '...'
  } else {
    messageBody = props.recentMessage.textBody;
  }

  const timeAgo = timeSince(props.recentMessage.timeSent) + ' ago';

  function changeBg() {

    const msgUsername = document.querySelectorAll('.message-username');
    let currentEl;

    for (let item of msgUsername) {
      if (item.textContent === props.username) {
        currentEl = item.parentElement.parentElement;
      }
    }

    const msgTextContainers = document.querySelectorAll('.message-item-container');

    for (let item of msgTextContainers) {
      item.classList.remove('message-list-selected');
    }
    currentEl.classList.add('message-list-selected');
  }


  return (
    <div className='message-item-container' onClick={() => props.clickMe(props.username)}>
      <div className="message-icon-container">
        <div className='message-icon'>{firstInitial}</div>
      </div>
      <div className="message-username-text">
        <p className='message-username'>{props.username}</p>
        <p className='message-last'>{messageBody}</p>
      </div>
      <div className="message-time">
        {timeAgo}
      </div>
    </div>
  )

}