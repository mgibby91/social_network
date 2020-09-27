import React from "react";
import ProgressBar from '../../components/ProgressBar/ProgressBar'

import {
  Route,
  BrowserRouter as Router,
  Link,
  useRouteMatch,
} from "react-router-dom";

export default function StudentListItem(props) {
	
	function Profile() {
    const match = useRouteMatch("/user_profile/:name");
    return match ? <UserProfile /> : <p>My own profile</p>;
	}
	
	const setStudent = (userId) => {
    props.setSelectedUser(userId)
	}
	
  return (
    <Router>
      <Link to={`/user_profile/${props.username}`}>
        <div onClick={ () => setStudent(props.userId)}>
          <img src={props.avatar} alt="avatar"></img>
          <h2>{props.username}</h2>
          <div>
            <ProgressBar experience={props.experience} />
          </div>
        </div>
      </Link>
      <Route path="/user_profiles">
        <Profile />
      </Route>
    </Router>
  );
}