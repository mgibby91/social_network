import React from "react";
import { Router } from "@reach/router";
import UserProfileItem from "../components/Profile/UserProfileItem";

function Profile(props) {
  // console.log("props in prof: ", props);
  return (
    <Router>
      <UserProfileItem path="user-profiles/" />
      <UserProfileItem path="user-profiles/:userId" />
    </Router>
  );
}

export default Profile;
