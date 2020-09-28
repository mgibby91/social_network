import React from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import {
  Route,
  BrowserRouter as Router,
  Link,
  useRouteMatch,
} from "react-router-dom";

export default function MentorListItem(props) {

  function Profile() {
    const match = useRouteMatch("/user_profiles/:name");
    return match ? <UserProfile /> : <p>My own profile</p>;
  }

  const setMentor = (userId) => {
    props.setSelectedUser(userId)
  }
  // console.log("props in mentor list: ", props);
  
  return (
    <Router>
      <Link to={`/user_profiles/${props.username}`}>
        <div onClick={ () => setMentor(props.userId)}>
          <img src={props.avatar} alt="avatar"></img>
          <h2>{props.username}</h2>
          <div>
            <ProgressBar experience={props.experience} />
          </div>
        </div>
      </Link>
    </Router>
  );
}
