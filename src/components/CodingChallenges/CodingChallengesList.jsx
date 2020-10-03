import React from 'react';
import CodingChallengesListItem from './CodingChallengesListItem';

export default function CodingChallengesList(props) {

  console.log('CodingChallengesList Props', props);

  const challengesItems = props.allChallenges.map(challenge => {
    return <CodingChallengesListItem
      key={challenge.id}
      id={challenge.id}
      title={challenge.title}
      description={challenge.description}
      difficulty={challenge.difficulty}
      completedChallenges={props.completedChallenges}
    />
  })

  return (
    <div className='coding-challenges-list-container'>
      {challengesItems}
    </div>
  )

}