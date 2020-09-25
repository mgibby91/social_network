import { breakpointUp } from "@paljs/ui/breakpoints";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React, { useState, useEffect } from "react";

function UserInfo(props) {
  return (
    <Row>
      <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}>Avatar Goes Here</Col>
      <Col breakPoint={{ xs: 6, sm: 6, md: 8, lg: 6 }}>
        <div>
          <p>Name</p>
          <p>@userName</p>
        </div>
      </Col>
      <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}></Col>
    </Row>
  );
}

export default UserInfo;
