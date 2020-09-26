import { breakpointUp } from "@paljs/ui/breakpoints";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Editor from "./profile-components/Editor";
import Stack from "./profile-components/UserStack";
import PostList from "./profile-components/PostList";
import UserInfo from "./profile-components/UserInfo";
import axios from "axios";
import { StepButton } from "@material-ui/core";

function Profile() {
  const [state, setState] = useState({
    user: {},
    posts: [],
    mentor_stack: [],
    student_stack: [],
  });

  const usersPromise = useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/user_profiles/1"),
      axios.get("http://localhost:8001/api/posts/1"),
      axios.get("http://localhost:8001/api/mentor_stack/1"),
    ])
      .then((all) => {
        const user = all[0].data[0];
        const posts = all[1].data;
        const mentor_stack = all[2].data;

        // console.log(userInfo, allPosts);
        setState((prev) => ({
          ...prev,
          user,
          posts,
          mentor_stack,
        }));
      })
      .catch((err) => {
        console.log("user-profile", err);
      });
  }, []);

  const createPost = (postDetails) => {
    //need helper method to build this object here
    //pass the state and the other stuff
    const post = {
      active: true,
      owner_id: state.user.id,
      text_body: postDetails.text,
      time_posted: new Date().toLocaleString(),
      is_mentor: false,
      is_student: true,
    };

    if (!postDetails.mentor) {
      (post["is_mentor"] = true), (post["is_student"] = false);
    }
    const posts = [...state.posts, post];

    return axios
      .post(`http://localhost:8001/api/posts`, { post })
      .then((response, reject) => {
        console.log("profile", post);
        setState({
          ...state,
          posts,
        });
      });
  };

  return (
    <>
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <header>Profile</header>
            <CardBody>
              <UserInfo
                avatar={state.user.avatar}
                location={state.user.location}
                username={state.user.username}
                is_mentor={state.user.is_mentor}
                is_student={state.user.is_student}
              />
              <Stack mentor={state.mentor_stack} />
              <Row>
                <Col breakPoint={{ xs: 12, md: 12 }}>
                  <Editor createPost={createPost} />
                </Col>
              </Row>
              <Row>
                <Col breakPoint={{ xs: 12, md: 12 }}>
                  <header>Recent Posts</header>
                </Col>
              </Row>
              <PostList posts={state.posts} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Profile;
