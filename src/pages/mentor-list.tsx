import { Card, CardBody } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React from "react";
import Mentors from "../components/MentorList/Application";
import useApplicationData from "../hooks/useApplicationData";

export default function MentorList() {
  const { state, setSelectedUser } = useApplicationData();

  const mentors = state.mentor_points;
  
  return (
    <>
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <CardBody>
              <Mentors 
                mentors={mentors}
                setSelectedUser={setSelectedUser}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
