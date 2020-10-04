import React, { useState } from 'react';
import CodingEditor from './CodingEditor';

export default function CodingSpaceContainer(props) {

  const [JS, setJS] = useState('');

  console.log('CodingSpaceCont props', props);


  return (
    <div className='coding-space-container-container'>
      <CodingEditor
        value={JS}
        onChange={setJS}
      />
    </div>
  )

}