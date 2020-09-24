import React from 'react';
import MessageTextBubble from '../../components/messages/MessageTextBubble'

export default function MessageView(props) {

  console.log('MsgViewProps', props)
  const currentMessages = props.currentMessages;

  const messageData = currentMessages.map(msg => {

    return <MessageTextBubble
      key={currentMessages.indexOf(msg)}
      sender={msg.sender ? msg.sender : null}
      receiver={msg.receiver ? msg.receiver : null}
      timeSent={msg.time_sent}
      textBody={msg.text_body}
    />

  });

  return (
    <div className='message-text-container-right'>
      {messageData}
    </div>
  )
}