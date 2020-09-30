import React from 'react';
import MessageItem from '../components/Messages/Messages'
import { Router } from '@reach/router';

export default function Message() {

  // CREATE TUTOR SESSION STUFF ***************************************


  return (
    <Router>
      <MessageItem path="messages/" />
      <MessageItem path="messages/:userId" />
    </Router>
  );
}