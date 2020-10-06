import { Card, CardBody } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React from "react";
import Mentors from "../components/MentorList/Application";
import useApplicationData from "../hooks/useApplicationData";
import ContextConsumer from '../context/context'
import LoginLogout from '../components/LoginLogout/LoginLogout'
import Register from '../components/LoginLogout/Register'
export default function MentorList() {
  const { state, setSelectedUser } = useApplicationData();

  const mentors = state.mentor_points;
  <ContextConsumer>
  {({ data }) => {
    if (!data.state) return null;
    if (data.selected === null) return (
      <div>
        <h1>Please login or register before using Stack.</h1>
        <LoginLogout></LoginLogout>
        <Register></Register>
      </div>
    )
      return (
        <>
          <Row>
            <Col breakPoint={{ xs: 12 }}>
              <Card>
                <CardBody>
                  <Mentors 
                    mentors={mentors}
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
}
