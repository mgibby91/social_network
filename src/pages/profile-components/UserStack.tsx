import { breakpointUp } from "@paljs/ui/breakpoints";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React, { useState, useEffect } from "react";

function Stack(props) {
  const mentorStack = props.mentor.map((stack) => {
    return <li key={stack.id}>{stack.name}</li>;
  });

  return (
    <Row>
      <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <ul>Mentor Stack: {mentorStack}</ul>
      </Col>
    </Row>
  );
}

export default Stack;
