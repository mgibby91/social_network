import React from 'react';
import TutorFilterBtn from './TutorFilterBtn';

export default function TutorFilter(props) {

  return (
    <div className='tutor-filter-container'>
      <div className="tutor-filter-title">
        Filter By:
      </div>
      <div className="tutor-filter-btns">
        <TutorFilterBtn
          name={'All'}
        />
        <TutorFilterBtn
          name={'Pending'}
        />
        <TutorFilterBtn
          name={'In-progress'}
        />
        <TutorFilterBtn
          name={'Completed'}
        />
      </div>
    </div>
  );

}