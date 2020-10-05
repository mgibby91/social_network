import React, { useState, useEffect } from 'react';
import CodingEditor from './CodingEditor';

export default function CodingSpaceContainer(props) {

  const [JS, setJS] = useState('');
  const [currentFunc, setCurrentFunc] = useState('');

  setTimeout(() => {
    setCurrentFunc(props.currentFunction)
  }, 10);

  return (
    <div className='coding-space-container-container'>
      <CodingEditor
        value={JS ? JS : currentFunc}
        onChange={setJS}
        currentTests={props.currentTests}
      />
    </div>
  )

}