import React from 'react';

export default function CodingChallengeDescription(props) {

  console.log('CodingChallengeDesc Props', props);

  return (
    <div className='coding-description-container-container'>
      <div className="coding-description-title">
        Challenge Description
      </div>
      <div className="coding-description-details">
        {props.currentDescription}
      </div>
    </div>
  )

}