import { breakpointUp } from "@paljs/ui/breakpoints";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React, { useState, useEffect } from "react";
import { Button, ButtonLink } from "@paljs/ui/Button";
import Stack from "./UserStack";

function EditUserInfo(props) {
  return (
    <>
      <Row>
        <h1>{props.username}</h1>

        <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <p>Editing</p>
        </Col>
        <Col breakPoint={{ xs: 6, sm: 6, md: 8, lg: 6 }}></Col>
        <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}></Col>
      </Row>
      <Row>
        <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Stack mentor={props.mentor_stack} />
        </Col>
        <Button fullWidth appearance="hero" status="Success">
          Save
        </Button>
        <Button
          fullWidth
          appearance="hero"
          status="Success"
          onClick={props.onCancel}
        >
          Cancel
        </Button>
      </Row>
    </>
  );
}

export default EditUserInfo;
