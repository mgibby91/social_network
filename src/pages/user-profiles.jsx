import React from "react";
import { Router } from '@reach/router'
import UserProfileItem from './profile-components/UserProfileItem';

function Profile() {
  
  return (
    <Router>
      <UserProfileItem path="user-profiles/" userId="4"/>
      <UserProfileItem path="user-profiles/:userId" />
    </Router>
  )
}

export default Profile;
