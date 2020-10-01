import { breakpointUp } from "@paljs/ui/breakpoints";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React, { useState, useEffect } from "react";
import { Button, ButtonLink } from "@paljs/ui/Button";
import Tags from "./MentorStack";

import Stack from "./UserStack";
import { Link } from "@reach/router";

function EditUserInfo(props) {
  //console.log("from edit user info", props);
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
              <input
                type="text"
                value={props.user.username}
                placeholder="Round border"
              />
              <input
                type="text"
                value={props.user.location}
                placeholder="Round border"
              />
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
              <Tags tags={props.mentor_stack} />
            </Col>
          </Row>
          <Row>
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
        </div>
      </CardBody>
    </Card>
  );
}

export default EditUserInfo;
