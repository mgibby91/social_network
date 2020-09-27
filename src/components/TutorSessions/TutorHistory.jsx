import React from 'react';
import TutorHistoryHeader from './TutorHistoryHeader';
import TutorHistoryBody from './TutorHistoryBody';

export default function TutorHistory(props) {

  console.log('tutorHistoryProps', props);

  return (
    <div className='tutor-history-container'>
      <TutorHistoryHeader />

      <TutorHistoryBody
        currentTutorData={props.currentTutorData}
        currentUserData={props.currentUserData}
        acceptAction={props.acceptAction}
        declineCancelAction={props.declineCancelAction}
      />
    </div>
  )

}