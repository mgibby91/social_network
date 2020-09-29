import React from "react";
import ProgressBar from '../../components/ProgressBar/ProgressBar'

import {
  Link,
} from "@reach/router";

export default function StudentListItem(props) {
	
  return (
      <Link to={`/user-profiles/${props.username}`}>
        <div>
          <img src={props.avatar} alt="avatar"></img>
          <h2>{props.username}</h2>
          <div>
            <ProgressBar experience={props.experience} />
          </div>
        </div>
      </Link>
  );
}