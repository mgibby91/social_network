import React from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { Button } from "@paljs/ui/Button";
import {
  Route,
  BrowserRouter as Router,
  Link,
  useRouteMatch,
} from "react-router-dom";
import UserProfile from "../../pages/user-profile";

export default function MentorListItem(props) {
  function Profile() {
    const match = useRouteMatch("/user_profile/:name");

    return match ? <UserProfile /> : <p>My own profile</p>;
  }

  return (
    <Router>
      <Link to={`/user_profile/${props.username}`}>
        <div>
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
