import { Card, CardBody } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React from "react";
import Users from "../components/UserList/UserList";
import useApplicationData from "../hooks/useApplicationData";
import ContextConsumer from '../context/context'
import NewLogin from '../pages/login'

export default function UserList() {
  const { state, setSelectedUser } = useApplicationData();

  const users = state.users;
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
        <>
          <Row>
            <Col breakPoint={{ xs: 12 }}>
              <Card>
                <CardBody>
                  <Users 
                    users={users}
                    setSelectedUser={setSelectedUser}
                    mentor_stack={state.mentor_stack}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      );
    }}
  </ContextConsumer>
  );
}
