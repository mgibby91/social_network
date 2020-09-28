import { breakpointUp } from "@paljs/ui/breakpoints";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React, { useState, useEffect } from "react";
import { Button, ButtonLink } from "@paljs/ui/Button";
import Stack from "./UserStack";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Progress from "@paljs/ui/ProgressBar";
import axios from "axios";
import { constants } from "buffer";

function UserInfo(props) {
  return (
    <>
      <Row>
        <h1>{props.username}</h1>

        <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <img src={props.avatar} alt="avatar" />
        </Col>
        <Col breakPoint={{ xs: 6, sm: 6, md: 8, lg: 6 }}>
          <p></p>
        </Col>
        <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          {" "}
          <Stack mentor={props.mentor_stack} />
        </Col>
      </Row>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}></Col>
        <Button
          fullWidth
          appearance="hero"
          status="Success"
          onClick={props.onEdit}
        >
          Edit
        </Button>
      </Row>
    </>
  );
}

export default UserInfo;
