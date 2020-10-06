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
          <div>
            <h1>Please login or register before using Stack.</h1>
            <NewLogin></NewLogin>
          </div>
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
