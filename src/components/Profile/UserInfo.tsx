import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React from "react";
import { Button } from "@paljs/ui/Button";
import Stack from "./UserStack";
import { Card, CardBody } from "@paljs/ui/Card";

function UserInfo(props) {

  if (!props.user) return null;
  console.log("props in userinfo: ", props.user.active);
  
  return (
    <>
      <Row>
        <Card>
          <CardBody>
            <h1>{props.user.username}</h1>
            <div>
              {props.active ? 
                <h6>User is online</h6>
              : <h6>User is offline</h6>}
            </div>
          </CardBody>
        </Card>

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
