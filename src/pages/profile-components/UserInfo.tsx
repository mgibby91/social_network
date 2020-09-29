import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React from "react";
import { Button, } from "@paljs/ui/Button";
import Stack from "./UserStack";

function UserInfo(props) {
  console.log("logged in user: ", props);
  
  if (!props.user) return null;

  return (
    <>
      <Row>
        <h1>{props.user.username}</h1>

        <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <img src={props.user.avatar} alt="avatar" />
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
