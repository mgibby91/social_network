import React from 'react';
import timeSince from '../../helpers/timeSince';

export default function MessageItem(props) {

  console.log('messageitemprops', props);

  const firstInitial = props.username[0].toUpperCase();
  console.log(firstInitial);

  let messageBody;
  if (props.recentMessage.textBody.length > 35) {
    messageBody = props.recentMessage.textBody.slice(0, 35) + '...'
  } else {
    messageBody = props.recentMessage.textBody;
  }

  const timeAgo = timeSince(props.recentMessage.timeSent) + ' ago'

  // need to convert time to days ago...

  return (
    <div className='message-item-container'>
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