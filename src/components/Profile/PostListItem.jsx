import React from "react";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody } from "@paljs/ui/Card";
import { Button } from "@paljs/ui/Button";
import timeSince from "../../helpers/timeSince";
import CommentList from "./Comments/CommentList";
import CommentForm from "./Comments/NewComment";
import EditPostItem from "./EditPost";
import ContextConsumer from "../../context/context";
import useVisualMode from "../../hooks/useVisualMode";

const SHOW = "SHOW";
const CONFIRM = "CONFIRM";
const SAVING = "SAVING";
const EDITING = "EDITING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

function PostListItem(props) {
  const senderID = document.cookie.split("=")[1];
  const [value, setValue] = React.useState("Comment here...");
  const { mode, transition, back } = useVisualMode(SHOW);

  function onDelete() {
    props.deletePost(props.post.post_id);
    // transition(EDITING);
  }

  function onEdit() {
    transition(EDITING);
  }

  function onSaveEdit() {
    transition(SHOW);
  }

  function onCancel() {
    back();
  }
  const commentData = props.comments.filter((comment) => {
    if (props.post.post_id === comment.post_id) {
      return comment;
    }
  });

  const commentList = commentData.map((comment, index) => {
    return (
      <CommentList
        key={index}
        index={props.index}
        avatar={comment.avatar}
        username={comment.username}
        text_body={comment.text_body}
      />
    );
  });

  return (
    <ContextConsumer>
      {({ data }) => {
        if (!data.state) return null;
        const currentUser = props.users.find(
          (user) => user.id === data.selected
        );
        const commentsLength = commentList.length;
        const commentObj = {
          avatar: currentUser.avatar,
          username: currentUser.username,
        };
        const onSave = () => {
          //check for empty input here
          console.log("props post id: ", props.post.post_id);

          props
            .createComment(
              props.post.post_id,
              currentUser.id,
              value,
              commentObj
            )
            .then(() => {
              setValue("");
            });
        };

        return (
          <Col
            className="post"
            key={props.index}
            breakPoint={{ xs: 12, md: 6 }}
          >
            <Card accent="Info">
              {mode === SHOW && (
                <CardBody>
                  {props.user.id === parseInt(senderID, 10) ? (
                    <div class="edit-post-button">
                      <button
                        className="blue-button button-transition"
                        onClick={onEdit}
                      >
                        Edit
                      </button>
                      <button
                        className="red-button red-button-transition"
                        onClick={onDelete}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <p className="time-posted">
                    {timeSince(props.post.time_posted)}{" "}
                  </p>
                  <p className="post-body">{props.post.text_body}</p>
                  <ul className="post-stack">
                    {/* <span className="bold">Stack:</span> */}
                    {props.post.stack.map((tech_stack, idx) => {
                      return <li key={idx}>{tech_stack}</li>;
                    })}
                  </ul>
                </CardBody>
              )}
              {mode === EDITING && (
                <EditPostItem
                  id={props.post.post_id}
                  time_posted={props.post.time_posted}
                  text_body={props.post.text_body}
                  stack={props.post.stack}
                  onSaveEdit={onSaveEdit}
                  user={currentUser}
                  updatePost={props.updatePost}
                />
              )}

              <div class="wrap-collabsible">
                <input
                  id={"collapsible" + props.index}
                  class="toggle"
                  type="checkbox"
                />
                <label for={"collapsible" + props.index} class="lbl-toggle">
                  Comments
                </label>
                <div class="collapsible-content">
                  <div class="content-inner">
                    {commentList}
                    <CommentForm onSave={onSave} />
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        );
      }}
    </ContextConsumer>
  );
}

export default PostListItem;
