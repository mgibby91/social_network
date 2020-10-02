import { Card, CardBody } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React from "react";
import Users from "../components/UserList/UserList";
import useApplicationData from "../hooks/useApplicationData";

export default function MentorList() {
  const { state, setSelectedUser } = useApplicationData();

  const users = state.users;
  
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
}
