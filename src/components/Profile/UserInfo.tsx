import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React from "react";
import { Button } from "@paljs/ui/Button";
import Stack from "./UserStack";
import Experience from "./UserExperience";
import { Card, CardBody } from "@paljs/ui/Card";
import { Link } from "@reach/router";

function UserInfo(props) {
  if (!props.user) return null;
  console.log("props in userinfo: ", props.user);

  return (
    <Card>
      <CardBody>
        <div className="user-info">
          <Row>
            <Col
              className="avatar"
              breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}
            >
              <div className="avatar-container">
                <img src={props.user.avatar} alt="avatar" />
              </div>

              <p className="username">
                <span>@</span>
                {props.user.username}
                <span> ({props.user.location})</span>
              </p>
            </Col>
            <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              {/* <Experience /> */}
            </Col>
            <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              {props.active ? (
                <p className="status">
                  User is <span className="online">online</span>
                </p>
              ) : (
                <p className="status">
                  User is <span className="offline">offline</span>
                </p>
              )}
            </Col>
            <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <Stack mentor={props.mentor_stack} />
            </Col>
          </Row>
          <Row>
            <Link to={`/messages/`} state={{ username: props.user.username }}>
              <Button
                fullWidth
                appearance="hero"
                status="Success"
                // onClick={props.onEdit}
              >
                Message
              </Button>
            </Link>
            <Button
              fullWidth
              appearance="hero"
              status="Success"
              onClick={props.onEdit}
            >
              Edit
            </Button>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
}

export default UserInfo;
