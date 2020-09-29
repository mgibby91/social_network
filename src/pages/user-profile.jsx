import React from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";

import Editor from "../components/Profile/Editor";
import PostList from "../components/Profile/PostList";
import UserInfo from "../components/Profile/UserInfo";
import EditUserInfo from "../components/Profile/EditUserInfo";
import Experience from "../components/Profile/UserExperience";

import axios from "axios";

import { getUser, getUserPosts, getStack } from "../helpers/profileHelpers";
import useVisualMode from "../hooks/useVisualMode";
import useApplicationData from "../hooks/useApplicationData";

const SHOW = "SHOW";
const CONFIRM = "CONFIRM";
const SAVING = "SAVING";
const EDITING = "EDITING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

function Profile() {
  const { state, createPost } = useApplicationData();
  const { mode, transition, back } = useVisualMode(SHOW);

  const senderID = document.cookie.split("=")[1];

  const posts = getUserPosts(state.posts, senderID);
  const user = getUser(state.user_profiles, senderID);
  const mentor_stack = getStack(state.mentor_stack, senderID);

  function onEdit() {
    transition(EDITING);
  }

  function onCancel() {
    // console.log("WOW");
    back();
  }

  return (
    <>
      {console.log("state", state.posts)}
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <header>
              <h1>Profile</h1>
            </header>
            <CardBody>
              {mode === SHOW && (
                <>
                  <UserInfo
                    avatar={user.avatar}
                    location={user.location}
                    username={user.username}
                    is_mentor={user.is_mentor}
                    is_student={user.is_student}
                    onEdit={onEdit}
                    mentor_stack={mentor_stack}
                  />
                </>
              )}
              {mode === EDITING && (
                <>
                  <EditUserInfo
                    avatar={user.avatar}
                    location={user.location}
                    username={user.username}
                    is_mentor={user.is_mentor}
                    is_student={user.is_student}
                    mentor_stack={mentor_stack}
                    // onSave={onSave}
                    onCancel={onCancel}
                  />
                </>
              )}

              <Experience
                mentor={state.mentor_points}
                student={state.student_points}
              />
              <Row>
                <Col breakPoint={{ xs: 12, md: 12 }}>
                  <Editor id={user.id} createPost={createPost} />
                </Col>
              </Row>
              <Row>
                <Col breakPoint={{ xs: 12, md: 12 }}>
                  <h2>Recent Posts</h2>
                </Col>
              </Row>
              <PostList posts={posts} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Profile;
