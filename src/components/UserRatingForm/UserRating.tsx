import React, { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import onStarHover from "react-star-rating-component";
import onStarClick from "react-star-rating-component";
import { Button } from "@paljs/ui/Button";
import { InputGroup } from "@paljs/ui/Input";
import styled from "styled-components";
import axios from "axios";
import reducer, { SET_RATING } from "../../reducers/application";
import useApplicationData from "../../hooks/useApplicationData";

interface IStudents {
  [index: number]: { id: number; username: string; studentrating: string };
}
interface IMentors {
  [index: number]: { id: number; username: string; mentorrating: string };
}

interface IProps_UserRating {
  onClick: any;
  students: IStudents;
  mentors: IMentors;
}

export default function UserRating(props: IProps_UserRating) {
  const [rating, setRating] = useState(0);

  const { addMentorPoints, addStudentPoints } = useApplicationData;

  const onStarClick = (nextValue, prevValue, name) => {
    setRating(nextValue);
  };

  // TODO: FIX HOVER TO SET BACK TO 0 IF USER WANTS TO!!!!

  const onStarHover = (nextValue, prevValue, name) => {
    setRating(nextValue);
  };

  const Input = styled(InputGroup)`
    margin-bottom: 10px;
  `;

  const { students, mentors } = props;

  const addStars = (rating, userID) => {
    /*
    if user id's mentor status is true, add points to student_points
    else add to mentor_points
    */
  };

  return (
    <div>
      <h1>RATE YOUR EXPERIENCE</h1>
      <div>
        <h4>Rate User</h4>
        <h3>{rating}/5 Stars</h3>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={onStarClick}
          onStarHover={onStarHover}
        />
        <div>
          <Input fullWidth shape="Round">
            <textarea rows={5} placeholder="Comments..." />
          </Input>
          <Button onClick={() => console.log("button has been clicked!")}>
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
}
