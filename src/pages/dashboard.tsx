import React, { useState, useEffect } from "react";
import PostList from "../components/DashBoard/PostList";
import axios from 'axios';
import PostTextArea from '../components/DashBoard/PostTextArea';

interface IProps {
	value: object,
	submitPost: (username: string) => void,
	username: "string",
	onChange: void;
}


export default function Home() {
  const [count, setCount] = useState(0);

  function submitPost() {

    const textInput: HTMLScriptElement = document.querySelector('#post-textarea').value;

    // error handling for blank inputs
    if (!textInput) {
      const errorContainer: HTMLScriptElement = document.querySelector('.error-container');
      errorContainer.style.display = 'block';

      setTimeout(() => {
        errorContainer.style.display = 'none';
      }, 2000);

    } else {
      const senderID = document.cookie.split('=')[1];

      axios.post('http://localhost:8001/api/posts/new', { textInput, senderID, } )
        .then(() => {
          setCount(count + 1);
          document.querySelector('#post-textarea').value = '';
        })  
    }  
  }

  return (
    <div className="App">
      <PostTextArea 
        submitPost={submitPost}
      />
      <PostList 
      />
    </div>
  );
}