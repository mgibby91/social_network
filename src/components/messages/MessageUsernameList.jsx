import React from 'react';
import MessageUsernameListItem from './MessageUsernameListItem';

export default function MessageUsernameList(props) {

  const usernameList = props.usernameList;
  console.log('usernamelist', usernameList);
  console.log(document.cookie.split('=')[1]);

  const currentUserID = Number(document.cookie.split('=')[1]);
  const filteredUsernameList = usernameList.filter(user => {
    return user.id !== currentUserID;
  })

  const usernameListData = filteredUsernameList.map(user => {
    return <MessageUsernameListItem
      key={user.id}
      id={user.id}
      username={user.username}
      avatar={user.avatar}
    />
  })

  return (
    <div>
      <label htmlFor="username-list-data">User: </label>
      <select name="username-list-data" id="username-list-data">{usernameListData}</select>
    </div>
  )

}