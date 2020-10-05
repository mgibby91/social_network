import React from 'react';

export default function CodingProgressBar(props) {

  // console.log('CodingProgressBar Props', props);

  return (
    <div className='coding-progress-container'>
      {props.leftoverExp === 0 && (
        <div className='coding-low-exp'>{props.leftoverExp} / 100 XP</div>
      )}
      {props.leftoverExp > 10 && (
        <div className="coding-progress-fill" style={{ width: props.leftoverExp + '%' }}>
          {props.leftoverExp} / 100 XP
        </div>
      )}
    </div>
  );

}