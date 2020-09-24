import React from "react";
import ProgressBar from '../../components/ProgressBar/ProgressBar'
export default function MentorListItem(props) {
	
  return (
		<div>
			<img src={props.avatar} alt="avatar"></img>
			<h2>{props.username}</h2>
			<div>
				<ProgressBar 
				experience={props.experience}
				/>
			</div>
		</div>
  );
}