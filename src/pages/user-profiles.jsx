import React from "react";
import { Router } from "@reach/router";
import UserProfileItem from "../components/Profile/UserProfileItem";
import ContextConsumer from '../context/context'
import NewLogin from '../components/LoginLogout/NewLogin'

function Profile(props) {
  // console.log("props in prof: ", props);
  return (
    <ContextConsumer>
    {({ data }) => {
      if (!data.state) return (
        <div>
          <h1>Please login or register before using Stack.</h1>
          <NewLogin></NewLogin>
        </div>
      )
      return (
        <Router>
          <UserProfileItem path="user-profiles/" />
          <UserProfileItem path="user-profiles/:userId" />
        </Router>
      );
    }}
  </ContextConsumer>
  );
}
export default Profile;
