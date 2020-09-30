import React from 'react';
import Messages from '../components/messages/Messages'
import { Router } from '@reach/router';
export default function Message() {
  // CREATE TUTOR SESSION STUFF ***************************************
  return (
    <Router>
      <Messages path="messages/" />
      <Messages path="messages/:userId" />
    </Router>
  );
}