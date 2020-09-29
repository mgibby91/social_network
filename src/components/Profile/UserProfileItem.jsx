import React from "react";
import { Card, CardBody } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import Editor from "./Editor";
import PostList from "./PostList";
import UserInfo from "./UserInfo";
import EditUserInfo from "./EditUserInfo";
import Experience from "../../pages/profile-components/UserExperience";
import ContextConsumer from "../../context/context";
import { getUser, getUserPosts, getStack } from "../../helpers/profileHelpers";
import useVisualMode from "../../hooks/useVisualMode";
import useApplicationData from "../../hooks/useApplicationData";

const SHOW = "SHOW";
const CONFIRM = "CONFIRM";
const SAVING = "SAVING";
const EDITING = "EDITING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

function UserProfileItem(props) {
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
    console.log("WOW");
    back();
  }

  // const users = state.users;
  let currentUser = state.users.find(
    (user) => user.id === props.userId || user.username === props.userId
  );
  console.log("mode after prof item: ", mode);
  return (
    <>
      <ContextConsumer>
        {({ data, set }) => {
          // console.log("data in context: ", data.selected);
          if (!data.state) return null;
          console.log("users in context: ", data.state.users);
          if (!currentUser) {
            currentUser = data.state.users.find(
              (user) => user.username === data.selected
            );
            console.log("current user in context: ", currentUser);
          }
          if (!currentUser) {
            return <h1>You must be logged in to view this page.</h1>;
          }
          return (
            <Row>
              <Col breakPoint={{ xs: 12 }}>
                <Card>
                  <header>Profile</header>
                  <CardBody>
                    {mode === SHOW && (
                      <>
                        <UserInfo
                          user={currentUser}
                          loggedInUser={data.selected}
                          onEdit={onEdit}
                          mentor_stack={mentor_stack}
                        />
                      </>
                    )}
                    {mode === EDITING && (
                      <>
                        <EditUserInfo
                          user={currentUser}
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
                      mentor={currentUser.mentorrating}
                      student={currentUser.studentrating}
                      user={currentUser}
                      // userId={state.user.id}
                      // username={state.user.username}
                    />

                    <Row>
                      <Col breakPoint={{ xs: 12, md: 12 }}>
                        <Editor id={user.id} createPost={createPost} />
                      </Col>
                    </Row>
                    <Row>
                      <Col breakPoint={{ xs: 12, md: 12 }}>
                        <header>Recent Posts</header>
                      </Col>
                    </Row>
                    <PostList posts={posts} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          );
        }}
      </ContextConsumer>
    </>
  );
}

export default UserProfileItem;
