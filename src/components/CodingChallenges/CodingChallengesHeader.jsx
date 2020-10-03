import React from 'react';

export default function CodingChallengesHeader(props) {

  console.log('CodingChallengesHeader Props', props);

  return (
    <div className='coding-challenges-container-header'>
      <div className="coding-challenges-header-title">
        Coding Challenges List
      </div>
      <div className="coding-challenges-filtering">
        <div className="filter-title">
          Filter By:
        </div>
        <div className="filter-btns">
          <div className="fitler-btn-all coding-filter-btn">All</div>
          <div className="fitler-btn-incomplete coding-filter-btn" onClick={() => props.filterIncomplete()}>Incomplete</div>
          <div className="fitler-btn-completed coding-filter-btn" onClick={() => props.filterCompleted()}>Complete</div>
          <div className="fitler-btn-easy coding-filter-btn">Easy</div>
          <div className="fitler-btn-medium coding-filter-btn">Medium</div>
          <div className="fitler-btn-hard coding-filter-btn">Hard</div>
        </div>
      </div>
      <div className="coding-challenges-list-header-title">
        <div className="list-header-title">
          Title
        </div>
        <div className="list-header-difficulty">
          Difficulty
        </div>
        <div className="list-header-completed">
          Completed
        </div>
      </div>
    </div>
  )

}