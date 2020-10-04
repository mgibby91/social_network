import React from "react";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody } from "@paljs/ui/Card";
import { Button } from "@paljs/ui/Button";
import timeSince from "../../helpers/timeSince";
import CommentList from "./Comments/CommentList";
import CommentForm from "./Comments/NewComment";
import ContextConsumer from "../../context/context";

function PostListItem(props) {
  const [value, setValue] = React.useState("Comment here...");
  const commentData = props.comments.filter((comment) => {
    if (props.post.post_id === comment.post_id) {
      return comment;
    }
  });

  const commentList = commentData.map((comment, index) => {
    return (
      <CommentList
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
          (user) => user.username === data.selected
        );
        const onSave = () => {
          //check for empty input here
          props
            .createComment(props.post.post_id, currentUser.id, value)
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
              <CardBody>
                <p className="time-posted">
                  {timeSince(props.post.time_posted)}{" "}
                </p>
                <p className="post-body">{props.post.text_body}</p>
                <ul className="post-stack">
                  <span className="bold">Stack:</span>
                  {props.post.stack.map((tech_stack, idx) => {
                    return <li key={idx}>{tech_stack}</li>;
                  })}
                </ul>
              </CardBody>
              <CardBody>{commentList}</CardBody>
              <CardBody>
                <CommentForm onSave={onSave} />
              </CardBody>
            </Card>
          </Col>
        );
      }}
    </ContextConsumer>
  );
}

export default PostListItem;
