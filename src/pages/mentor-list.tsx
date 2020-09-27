import { Card, CardBody } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React, { useState } from "react";
import Application from "../components/MentorList/Application";
import useApplicationData from "../hooks/useApplicationData";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

export default function MentorList() {
  const { state } = useApplicationData();

  const mentors = state.mentor_points;

  console.log("mentors in mentor list: ", mentors);

  return (
    <>
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <CardBody>
              <Application mentors={mentors} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
