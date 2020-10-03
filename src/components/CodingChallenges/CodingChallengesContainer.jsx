import React, { useState } from 'react';
import CodingChallengesHeader from './CodingChallengesHeader';
import CodingChallengesList from './CodingChallengesList';

export default function CodingChallengesContainer(props) {

  console.log('CodingChallenges Props', props);

  const [currentFilteredChallenges, setCurrentFilteredChallenges] = useState([]);

  function filterCompleted() {
    let filteredCompleteArray = [];
    for (let challenge of props.allChallenges) {
      for (let complete of props.completedChallenges) {
        if (challenge.id === complete.coding_challenge_id && complete.completed) {
          filteredCompleteArray.push(challenge);
        }
      }
    }

    setCurrentFilteredChallenges(filteredCompleteArray);
  }

  function filterIncomplete() {
    const completedNumArray = props.completedChallenges.map(item => {
      return item.coding_challenge_id;
    });

    let incompleteArray = [];
    for (let challenge of props.allChallenges) {
      if (!completedNumArray.includes(challenge.id)) {
        incompleteArray.push(challenge);
      }
    }

    setCurrentFilteredChallenges(incompleteArray);
  }

  function filterAll() {
    setCurrentFilteredChallenges(props.allChallenges);
  }

  function filterDifficulty(difficulty) {
    const filteredDifficultyArray = props.allChallenges.filter(item => {
      return item.difficulty === difficulty;
    });

    setCurrentFilteredChallenges(filteredDifficultyArray);
  }

  return (
    <div className='coding-challenges-container'>
      <CodingChallengesHeader
        filterCompleted={filterCompleted}
        filterIncomplete={filterIncomplete}
        filterAll={filterAll}
        filterDifficulty={filterDifficulty}
      />
      <CodingChallengesList
        allChallenges={currentFilteredChallenges.length ? currentFilteredChallenges : props.allChallenges}
        completedChallenges={props.completedChallenges}
      />
    </div>
  );

}