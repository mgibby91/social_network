import { breakpointUp } from "@paljs/ui/breakpoints";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Editor from "./profile-components/editor";
import Post from "./profile-components/recent-post";
import { Button, ButtonLink } from "@paljs/ui/Button";

interface BoxProps {
  nested?: boolean;
  container?: boolean;
  row?: boolean;
  large?: boolean;
}

function Profile() {
  return (
    <>
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <header>Profile</header>

            <CardBody>
              <Row>
                <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  Avatar Goes Here
                </Col>
                <Col breakPoint={{ xs: 6, sm: 6, md: 8, lg: 6 }}>
                  <div>
                    <p>Name</p>
                    <p>@userName</p>
                  </div>
                </Col>
                <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}></Col>
              </Row>
              <Row>
                <Col breakPoint={{ xs: 12, md: 12 }}>
                  <Editor />
                  <Col
                    key={1}
                    offset={{ xs: 11 - 1 }}
                    breakPoint={{ xs: 1 + 1 }}
                  >
                    <Button fullWidth appearance="hero" status="Success">
                      Post
                    </Button>
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col breakPoint={{ xs: 12, md: 12 }}>
                  <header>Recent Posts</header>
                </Col>
              </Row>
              <Row>
                <Post></Post>
                <Post></Post>
                <Post></Post>
                <Post></Post>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Profile;
