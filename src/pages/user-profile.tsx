import { breakpointUp } from "@paljs/ui/breakpoints";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Editor from "./profile-components/Editor";
import Post from "./profile-components/Post";
import UserInfo from "./profile-components/UserInfo";
import { Button, ButtonLink } from "@paljs/ui/Button";
import axios from "axios";

interface BoxProps {
  nested?: boolean;
  container?: boolean;
  row?: boolean;
  large?: boolean;
}

function Profile() {
  const [state, setState] = useState({
    user: {},
    posts: [],
  });

  const usersPromise = useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/user_profiles/1"),
      axios.get("http://localhost:8001/api/posts/1"),
    ])
      .then((all) => {
        const userInfo = all[0].data;
        const posts = all[1].data;

        setState((prev) => ({ ...prev, userInfo, posts }));
      })
      .catch((err) => {
        console.log("user-profile", err);
      });
  }, []);
  return (
    <>
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <header>Profile</header>
            <CardBody>
              <UserInfo />
              <Row>
                <Col breakPoint={{ xs: 12, md: 12 }}>
                  <Editor user={state.user} />
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
