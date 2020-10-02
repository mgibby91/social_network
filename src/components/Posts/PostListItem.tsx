import React, { useRef } from "react";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody } from "@paljs/ui/Card";
import { Link } from "@reach/router";
import { Button } from "@paljs/ui/Button";
import ContextConsumer from "../../context/context";
import "./PostListItem.scss";
const classNames = require("class-names");

interface IProps {
  key: number;
  post: IPost;
  likes: ILikes;
  active: boolean;
  comments: IComments;
  comment: object;
  addLike: (post_id: number, liker_id: number) => void;
  onClick: () => void;
  id: number;
  data: any;
  users: IUsers;
  createComment: (
    post_id: number,
    commenter_id: number,
    text_body: string
  ) => void;
  onChange: () => void;
  then: () => void;
}

interface IUsers {
  [index: number]: { id: number; user_id: number; name: string };
}

interface IComments {
  [index: number]: { id: number; user_id: number; name: string };
}

interface ILikes {
  [index: number]: { id: number; user_id: number; name: string };
}

interface IPost {
  avatar: string;
  studentrating: string;
  text_body: string;
  active: boolean;
  time_posted: Date;
  stack: any;
  username: string;
  post_id: number;
  id: number;
}

export default function PostListItem(props: IProps) {
  const [value, setValue] = React.useState("Comment here...");

  const list = classNames("post_body__item-list");
  const commentStyle = classNames("post_body__item-comments");

  const stack = props.post.stack.map((tech_stack, index) => {
    return (
      <li className={list} key={index}>
        {tech_stack}&nbsp;
      </li>
    );
  });

  const commentData = props.comments.filter((comment) => {
    if (props.post.post_id === comment.post_id) {
      return comment;
    }
  });

  const commentList = commentData.map((comment, index) => {
    return (
      <div key={index}>
        <img src={comment.avatar} alt="avatar" />
        <p className={commentStyle}>
          <b>{comment.username}</b>
        </p>
        <li className={commentStyle}>{comment.text_body}</li>
      </div>
    );
  });

  const commentsLength = commentList.length;

  const likesData = props.likes.filter((like) => {
    if (props.post.post_id === like.post_id) {
      return like.liker_id;
    }
  });

  const likeSum = likesData.length;

  const postBody = classNames("post_body");
  const userLink = classNames("post_body__item-user_link");
  const messageButton = classNames("post_body__item-message_button");
  const commentListStyle = classNames("post_body__item-comment_list");
  const commentButton = classNames("post_body__item-comment_button");
  console.log("comment in item: ", props.comment);
  const userCard = classNames("post_body__item-user_card");
  const circle = classNames("post_body__item-circle");
  const inline = classNames("post_body__item-inline")
  return (
    <>
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
            <div>
              <Row>
                <Col breakPoint={{ xs: 12 }}>
                  <Card>
                    <CardBody className={postBody}>
                      {/* USERS DETAILS */}
                      <Link
                        className={userLink}
                        to={`/user-profiles/${props.post.username}`}
                      >
                        <div className={inline}>
                          <div className={circle}>
                            <img src={props.post.avatar} alt="avatar"></img>
                          </div>

                          <div className={userCard}>
                            <h3>{props.post.username}</h3>
                            <span>
                              {props.active ? (
                                <h6>User is online</h6>
                              ) : (
                                <h6>User is offline</h6>
                              )}
                            </span>
                          </div>
                        </div>
                      </Link>

                      {/* MESSAGE BUTTON */}
                      <div className={messageButton}>
                        <Link
                          to={`/messages/`}
                          state={{ username: props.post.username }}
                        >
                          <Button>Message User</Button>
                        </Link>
                      </div>

                      {/* POST TEXT BODY */}
                      <p>{props.post.text_body}</p>

                      {/* POST STACK LIST */}
                      <h5>Stack: {stack}</h5>

                      {/* BUTTON FOR LIKES */}
                      <Button
                        onClick={() =>
                          props.addLike(props.post.post_id, currentUser.id)
                        }
                      >
                        Like
                      </Button>

                      {/* LIKE COUNT */}
                      <p>
                        <b>{likeSum} Likes</b>
                      </p>

                      {/* COMMENTS LIST FOR POST */}
                      <h6>{commentsLength > 1 ? commentsLength : ""} </h6>
                      {/* <div className={commentListStyle}> */}
                      <ul className={commentListStyle}>{commentList}</ul>
                      {/* </div> */}

                      {/* FOR COMMENTING */}
                      <textarea
                        value={value}
                        onChange={(event) => {
                          setValue(event.target.value);
                        }}
                        rows="2"
                        cols="80"
                        placeholder="Leave a comment here.."
                      ></textarea>
                      <div className={commentButton}>
                        <Button onClick={() => onSave()}>Comment</Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          );
        }}
      </ContextConsumer>
    </>
  );
}
