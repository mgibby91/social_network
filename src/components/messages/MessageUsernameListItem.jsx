import React from 'react';

export default function MessageUsernameListItem(props) {

  console.log('MULI', props);

  return (
    <option value={props.id} id={props.id} >{props.username}</option>
  )

}