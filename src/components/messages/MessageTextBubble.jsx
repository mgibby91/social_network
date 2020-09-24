import React from 'react';
import timeSince from '../../helpers/timeSince'
const classNames = require('classnames');

export default function MessageTextBubble(props) {

  console.log('msgTextBblProps', props);

  const containerClass = classNames('text-container', { 'text-right-container': props.sender, 'text-left-container': props.receiver });
  const textTextClass = classNames('text-text', { 'text-text-right': props.sender, 'text-text-left': props.receiver });
  const textTimeClass = classNames('text-time', { 'text-time-right': props.sender, 'text-time-left': props.receiver })

  const timeAgo = timeSince(props.timeSent);


  return (
    <div className={containerClass}>
      <div className={textTextClass}>
        {props.textBody}
      </div>
      <div className={textTimeClass}>
        {timeAgo + ' ago'}
      </div>
    </div>
  );
}