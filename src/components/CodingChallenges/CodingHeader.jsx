import React from 'react';
import CodingProgressBar from './CodingProgressBar';

export default function CodingHeader(props) {

  // console.log('CodingHeader Props', props);

  function changeAvatarSize(props, width) {
    const avatarUrl = props.userInfo.avatar;
    if (avatarUrl) return avatarUrl.replace(/50/g, width);
  }

  function getExperiencePoints(props) {
    let count = 0;
    if (props.completedChallenges) {
      for (let challenge of props.completedChallenges) {
        if (challenge.difficulty === 'Easy') count += 20;
        else if (challenge.difficulty === 'Medium') count += 40;
        else if (challenge.difficulty === 'Hard') count += 80;
      }
    }
    return count;
  }

  function getCurrentLevel(expPoints) {
    // console.log('expPoints', expPoints)
    const currentLevel = Math.floor(expPoints / 100 + 1);
    const leftoverExp = expPoints - ((currentLevel - 1) * 100)

    return {
      currentLevel: currentLevel,
      leftoverExp: leftoverExp
    }
  }

  // console.log('level, exp', getCurrentLevel(getExperiencePoints(props)));

  return (
    <div className='coding-header-container'>
      <div className="header-avatar-container">
        <img src={changeAvatarSize(props, 125)} alt="" />
      </div>
      <div className="header-progress-container">
        <div className="header-progress-text">
          <strong>{props.userInfo.username}: </strong>
          Level {getCurrentLevel(getExperiencePoints(props)).currentLevel} Coder
        </div>
        <CodingProgressBar
          leftoverExp={getCurrentLevel(getExperiencePoints(props)).leftoverExp}
        />
      </div>
    </div>
  );

}