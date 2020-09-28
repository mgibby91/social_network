import React, { useState } from 'react';
import ReactStars from "react-star-rating-component";

export default function TutorRate(props) {

  const [rating, setRating] = useState(0);

  console.log('tutorrateprops', props);

  const onStarClick = (nextValue) => setRating(nextValue);
  const onStarHover = (nextValue) => setRating(nextValue);

  function getIsMentor(props) {
    const userID = Number(document.cookie.split('=')[1]);
    const sessionID = props.currentTutorID;

    for (let tutorSession of props.currentTutorData) {
      if (sessionID === tutorSession.id) {
        if (userID === tutorSession.mentor_id) {
          return true;
        }
        return false;
      }
    }

  }

  function getTutorComments() {
    return document.querySelector('#tutor-rate-comments').value;
  }

  // *******************
  // add username to tutor session title
  // *******************


  return (
    <div className='tutor-rate-container'>
      <div className="rate-tutor-header">
        Rate Tutor Session: <strong>{props.otherUsername}</strong>
      </div>
      <div className="rate-tutor-stars">
        <ReactStars
          className={'tutor-rating'}
          size={80}
          starCount={5}
          value={rating}
          name={'rate-tutor'}
          onStarClick={onStarClick}
          onStarHover={onStarHover}
        />
      </div>
      <div className="rate-tutor-comments">
        <textarea name="tutor-rate-comment" id="tutor-rate-comments" cols="43" rows="7" placeholder='Comments...'></textarea>
      </div>
      <div className="rate-tutor-btn" onClick={() => props.submitRating(props.currentTutorID, getIsMentor(props), rating, getTutorComments())}>
        Submit
      </div>
    </div>
  )

}