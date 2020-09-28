import React from 'react';
import TutorCreateOptionItem from './../TutorSessions/TutorCreateOptionItem';

export default function MessageTutorCreate(props) {

  console.log('MessageTutorCreateProps', props);

  const usernameList = props.avatarList;

  const currentUserID = Number(document.cookie.split('=')[1]);
  const filteredUsernameList = usernameList.filter(user => {
    return user.id !== currentUserID;
  })

  const usernameListData = filteredUsernameList.map(user => {
    return <TutorCreateOptionItem
      key={user.id}
      id={user.id}
      username={user.username}
    />
  })


  console.log('usernameListdata', usernameListData);

  return (
    <div className='tutor-create-container' style={{
      width: '1000px'
    }}>
      <div className="tutor-create-header">
        Create Tutor Session
    </div>
      <div className="tutor-create-mentor-student">
        <div className="create-mentor-student-header">You're looking for:</div>
        <div className="radio-mentor">
          <input type="radio" name='radio-mentor-student' id='mentor' defaultChecked />
          <label htmlFor="mentor">Mentorship</label>
        </div>
        <div className="radio-student">
          <input type="radio" name='radio-mentor-student' id='student' />
          <label htmlFor="student">Menteeship</label>
        </div>
      </div>
      <div className="tutor-create-username">
        <label htmlFor="create-username" className='create-username-title'>With who: </label>
        <select name="" id="tutor-username-list">
          {usernameListData}
        </select>
      </div>
      <div className="tutor-create-btn" onClick={() => props.createTutorSession()}>
        Create
    </div>
    </div >
  )

}