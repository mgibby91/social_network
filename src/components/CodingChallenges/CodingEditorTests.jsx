import React from 'react';

export default function CodingEditorTests(props) {

  console.log('codingEditorProps', props);

  return (
    <div className='test-runner-test-item'>
      {props.num + ') '}
      {props.description + '.'}
    </div>
  )

}