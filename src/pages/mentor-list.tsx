import { Card, CardBody } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React from "react";
import Mentors from "../components/MentorList/Application";
import useApplicationData from "../hooks/useApplicationData";
import { getStack } from '../helpers/profileHelpers';

export default function MentorList() {
  const { state, setSelectedUser } = useApplicationData();

  // const mentor_stack = getStack(state.mentor_stack, senderID);

  const mentors = state.mentor_points;
  console.log("mentors in -list: ", mentors);
  
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
}
