import React from 'react';
import Messages from '../components/messages/Messages'
import { Router } from '@reach/router';
import ContextConsumer from '../context/context'
import NewLogin from '../components/LoginLogout/NewLogin'
export default function Message() {
  // CREATE TUTOR SESSION STUFF ***************************************
  return (
    <ContextConsumer>
      {({ data }) => {
        if (!data.state) return (
            <NewLogin></NewLogin>
        )
        return (
          <Router>
            <Messages path="messages/" />
            <Messages path="messages/:userId" />
          </Router>
        );
      }}
    </ContextConsumer>
  );
}
