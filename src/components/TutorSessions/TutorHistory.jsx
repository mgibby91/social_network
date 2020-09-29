import React from 'react';
import TutorHistoryHeader from './TutorHistoryHeader';
import TutorHistoryBody from './TutorHistoryBody';
import TutorConfirmDelete from './TutorConfirmDelete';

export default function TutorHistory(props) {

  // console.log('tutorHistoryProps', props);

  return (
    <div className='tutor-history-container'>
      <TutorHistoryHeader />

      {!props.cancelDecline && (
        <TutorHistoryBody
          currentTutorData={props.currentTutorData}
          currentUserData={props.currentUserData}
          acceptAction={props.acceptAction}
          declineCancelAction={props.declineCancelAction}
          completeAction={props.completeAction}
        />
      )}

      {props.cancelDecline && (
        <TutorConfirmDelete
          cancelConfirmDelete={props.cancelConfirmDelete}
          tutorSessionID={props.tutorSessionID}
          confirmConfirmDelete={props.confirmConfirmDelete}
        />
      )}
    </div>
  )

}