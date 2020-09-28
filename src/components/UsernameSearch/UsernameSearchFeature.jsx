import React from 'react';
import '../../styles/username-search.css';
import UsernameSearchItem from './UsernameSearchItem';
import { useState } from 'react';

export default function UsernameSearchFeature(props) {

  const [searchResults, setSearchResults] = useState([]);

  const searchResultData = searchResults.map((result, index) => {
    return <UsernameSearchItem
      key={index}
      name={result}
    />
  })

  const usernameList = props.usernameList;

  function changeSearchState() {
    const userInput = document.querySelector('#search-user-input').value
    console.log(userInput);

    // user has to input set number of chars

    let currentSearchResults = [];
    for (let username of usernameList) {
      if (username.includes(userInput)) {
        currentSearchResults.push(username);
      }
    }

    setSearchResults(currentSearchResults);
    console.log(currentSearchResults);
  }

  return (
    <div className='username-search-container'>
      <div className='username-search-input'>
        <label htmlFor="search-user">Search: </label>
        <input type="text" id='search-user-input' placeholder='Enter username...' onChange={() => changeSearchState()} />
      </div>
      <div className="username-search-results">
        {searchResultData}
      </div>
    </div>

  )
}