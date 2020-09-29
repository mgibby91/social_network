import React from 'react';
const classNames = require('class-names');

export default function TutorFilterBtn(props) {

  const filterBtnClass = classNames('filter-btn', {
    'filter-btn-all': props.name === 'All Sessions',
    'filter-btn-pending': props.name === 'Pending',
    'filter-btn-in-progress': props.name === 'In-progress',
    'filter-btn-completed': props.name === 'Completed'
  })


  return (
    <div className={filterBtnClass} onClick={() => props.sortByStatus(props.name)}>
      {props.name}
    </div>
  );

}