import React from 'react';
import MessageButton from '../messages/MessageButton'

export default function MessageTextArea(props) {



  return (
    <div className='message-text-area-container'>
      <div className="message-text-area">
        <textarea name="message-text-area" id="" cols="30" rows="2"></textarea>
      </div>
      <div className="message-send-btn">
        <MessageButton
          name={'SEND'}
          send={true}
        />
      </div>
    </div>
  )

}