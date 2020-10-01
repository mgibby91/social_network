import React from "react";
import { Card, CardBody } from "@paljs/ui/Card";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import Editor from "./Editor";
import PostList from "./PostList";
import UserInfo from "./UserInfo";
import EditUserInfo from "./EditUserInfo";
import Experience from "./UserExperience";
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

  let senderID = document.cookie.split("=")[1];
  // console.log("from user-profile", senderID);

  function onEdit() {
    transition(EDITING);
  }

  function onCancel() {
    back();
  }

  // const users = state.users;
  let currentUser = state.users.find(
    (user) => user.id === props.userId || user.username === props.userId
  );
  // console.log("current user after prof item: ", props.userId);
  return (
    <>
      <ContextConsumer>
        {({ data, set }) => {
          // console.log("data in context: ", data.selected);
          if (!data.state) return null;

          if (!currentUser) {
            currentUser = data.state.mentor_points.find(
              (user) => user.username === data.selected
            );
            // console.log("current user in context: ", currentUser);
          }
          // console.log("mentor points: ", data.state.mentor_points);
          if (!currentUser) {
            currentUser = data.state.student_points.find(
              (user) => user.username === data.selected
            );
            // console.log("current user in context: ", currentUser);
          }
          // console.log("student points: ", data.state.student_points);

          if (!currentUser) {
            return <h1>You must be logged in to view this page.</h1>;
          }
          // console.log("current user in item: ", currentUser.id);
          // console.log("current user in item: ", currentUser.student_id);
          if (currentUser.id || currentUser.student_id || currentUser.mentor_id)
            senderID = currentUser;
          // console.log("sender id in context: ", senderID.id);
     
          const posts = getUserPosts(state.posts, senderID.id);
          // console.log("posts in prof item: ", posts);
          const user = getUser(state.user_profiles, senderID.id);

          const mentor = data.state.mentor_points.find((mentor => mentor.id === user.id));

          const student = data.state.student_points.find((student => student.id === user.id));

     

          const mentor_stack = getStack(state.mentor_stack, senderID.id);

          // console.log("user in prof item: ", user);
          // console.log("sender id in prof item: ", senderID.id);
          // console.log("mentor rating in user item: ", currentUser);
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
                          // avatar={user.avatar}
                          // location={user.location}
                          // username={user.username}
                          // is_mentor={user.is_mentor}
                          // is_student={user.is_student}
                          mentor_stack={mentor_stack}
                          // onSave={onSave}
                          onCancel={onCancel}
                        />
                      </>
                    )}

                    <Experience
                      mentor={mentor}
                      student={student}
                      user={currentUser}
                      // userId={state.user.id}
                      // username={state.user.username}
                    />

                    <Row>
                      <Col breakPoint={{ xs: 12, md: 12 }}>
                        <Editor
                          id={user.id}
                          createPost={createPost}
                          suggestion={state.stack_preferences}
                        />
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
