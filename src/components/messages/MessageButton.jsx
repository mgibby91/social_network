import React from 'react';
const classNames = require('class-names');

export default function MessageButton(props) {

  const msgBtnClass = classNames('msg-btn', { 'msg-btn-create': props.create, 'msg-btn-complete': props.complete, 'msg-btn-send': props.send })

  return (
    <div className={msgBtnClass} onClick={() => props.displayCreateTutorSession()}>
      {props.name}
    </div>
  )

}