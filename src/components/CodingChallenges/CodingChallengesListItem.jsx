import React from 'react';

export default function CodingChallengesListItem(props) {

  // console.log('CodingChallengesListItem Props', props);

  function getIsCompleted(props) {

    for (let challenge of props.completedChallenges) {
      if (challenge.coding_challenge_id === props.id && challenge.completed) {
        return true;
      }
    }
    return false;
  }

  // console.log('completed?', getIsCompleted(props));

  return (
    <div className='challenges-list-item' onClick={() => props.displayDescription(props.description, props.title, props.id)}>
      <div className="challenges-item-title">
        {props.title}
      </div>
      <div className="challenges-item-difficulty">
        {props.difficulty}
      </div>
      <div className="challenges-item-completed">
        {getIsCompleted(props) && (
          <div className="completed-icon">
            <img src="https://www.flaticon.com/svg/static/icons/svg/845/845646.svg" alt="" />
          </div>
        )}
        {!getIsCompleted(props) && (
          <div className="not-completed-icon">
            <img src="https://www.flaticon.com/svg/static/icons/svg/845/845648.svg" alt="" />
          </div>
        )}
      </div>
    </div>
  )

}