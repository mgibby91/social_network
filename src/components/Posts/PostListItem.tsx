import React, { useRef } from "react";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody } from "@paljs/ui/Card";
import { Link } from "@reach/router";
import { Button } from "@paljs/ui/Button";
import ContextConsumer from "../../context/context";
import "./PostListItem.scss";
import timeSince from "../../helpers/timeSince";

const classNames = require("class-names");

interface IProps {
  key: number;
  post: IPost;
  likes: ILikes;
  active: boolean;
  comments: IComments;
  comment: object;
  addLike: (post_id: number, liker_id: number) => void;
  removeLike: (post_id: number, liker_id: number) => void;
  onClick: () => void;
  id: number;
  data: any;
  users: IUsers;
  createComment: (
    post_id: number,
    commenter_id: number,
    text_body: string,
    comment_details: (avatar: any, username: any) => void
  ) => void;
  removeComment: (
    post_id: number,
    commenter_id: number,
    text_body: string
  ) => void;
  editComment: (
    post_id: number,
    commenter_id: number,
    text_body: string,
    value: string
  ) => void;
  onChange: () => void;
  then: () => void;
}

interface IUsers {
  [index: number]: { id: number; user_id: number; name: string };
}

interface IComments {
  [index: number]: { id: number; user_id: number; name: string, post_id: number, text_body: string };
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
  owner_id: number;
}

const list = classNames("post_body__item-list");
const commentStyle = classNames("post_body__item-comments");
const commentAvatar = classNames("post_body__item-comment_avatar");
const deleteButton = classNames("post_body__item-delete_button");
const postBody = classNames("post_body");
const textBody = classNames("post_body__item-text_body");
const userLink = classNames("post_body__item-user_link");
const messageButton = classNames("post_body__item-message_button");
const commentListStyle = classNames("post_body__item-comment_list");
const commentButton = classNames("post_body__item-comment_button");
const userCard = classNames("post_body__item-user_card");
const circle = classNames("post_body__item-circle");
const flex = classNames("post_body__item-flex");
const likesComments = classNames("post_body__item-likes_comments");
const bg = classNames("post_body__item-bg");
const floatRight = classNames("post_body__item-float_right");
const blueButton = classNames("post_body__item-blue_button");
const likeButton = classNames("post_body__item-like_button");

export default function PostListItem(props: IProps) {
  const [value, setValue] = React.useState("Comment here...");

  const stack = props.post.stack.map((tech_stack, index) => {
    return (
      <li className={list} key={index}>
        {tech_stack}&nbsp;
      </li>
    );
  });

  const postComments = props.comments.filter((comment) => {
    if (typeof props.post === 'undefined' || typeof comment === 'undefined') return null;
    if (props.post.post_id === comment.post_id) {
      return true;
    }
  });

  const postLikes = props.likes.filter(
    (like) => props.post.post_id === like.post_id
  );

  const likeSum = postLikes.length;



  return (
    <>
      <ContextConsumer>
        {({ data }) => {
          if (!data.state) return null;
          if (!data.selected) return null;
          const currentUser = props.users.find(
            (user) => user.id === data.selected
          );

          const myLikes = postLikes.filter(
            (like) => currentUser.id === like.liker_id
          );

          const iAlreadyLikeThis = myLikes.length > 0;
          
          const commentList = postComments.map((comment, index) => {

          const myComment = currentUser.id === comment.commenter_id;

          const myCommentOrPost = currentUser.id === comment.commenter_id || currentUser.id === props.post.owner_id ;
            
          const onRemove = () => {
            //check for empty input here
            props.removeComment(props.post.post_id, currentUser.id, comment.id);
          };

          return (
            <div key={index}>
              <img
                className={commentAvatar}
                src={comment.avatar}
                alt="avatar"
              />
              <div className={commentStyle}>
                <div className={flex}>
                  {/* {myCommentOrPost ? (
                    <p onClick={() => onEdit()} className={deleteButton}>
                      Edit
                    </p>
                  ) : (
                    ""
                  )} */}
                  {myCommentOrPost ? (
                    <p onClick={() => onRemove()} className={deleteButton}>
                      Delete
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <li>
                  <b>{comment.username}</b>
                </li>
                <li>{comment.text_body}</li>
              </div>
            </div>
          );
        });
          
          const commentsLength = commentList.length;
          const commentObj = {
            avatar: currentUser.avatar,
            username: currentUser.username,
          };
          // FOR COMMENTS
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

          // const onEdit = () => {
          //   //check for empty input here
          //   props.editComment(props.comment.post_id, currentUser.id, value, props.comment.text_body);
          // };

          const onRemove = () => {
            //check for empty input here
            props.removeComment(props.post.post_id, currentUser.id, value);
          };

          const timeAgo = timeSince(props.post.time_posted);

          return (
            <div>
              <Card>
                <CardBody className={postBody}>
                  {/* POST TEXT BODY */}
                  <div className={floatRight}>
                    <small className={floatRight}>{timeAgo}</small>
                    <p className={textBody}>{props.post.text_body}</p>
                  </div>

                  {/* USERS DETAILS */}
                  <Link
                    className={userLink}
                    to={`/user-profiles/${props.post.username}`}
                  >
                    <div>
                      <div className={flex}>
                        <div className={circle}>
                          <img src={props.post.avatar} alt="avatar"></img>
                        </div>    
                      </div>
                      <div className={userCard}>
                        <span className={bg}>
                          <h3>{props.post.username}</h3>
                        </span>

                        <span>{props.post.active ? <h6>User is online</h6> : <h6>User is offline</h6>}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* MESSAGE BUTTON */}
                  <div className={messageButton}>
                    <Link
                      className={userLink}
                      to={`/messages/`}
                      state={{ username: props.post.username }}
                    >
                      <div className={blueButton}>Message User</div>
                    </Link>
                  </div>

                  {/* POST STACK LIST */}
                  <h5>Stack: {stack}</h5>

                  {/* BUTTON FOR LIKES */}

                  {iAlreadyLikeThis ? (
                  <div
                    className={likeButton}
                    onClick={() => props.removeLike(props.post.post_id, currentUser.id)}
                    >Unlike</div>
                  ) : (
                  <div
                    className={likeButton}
                    onClick={() => props.addLike(props.post.post_id, currentUser.id)}
                    >Like</div>
                  )}

                  <div className={likesComments}>
                    {/* LIKE COUNT */}
                    {likeSum > 1 ? <p><b>{likeSum} Likes</b></p> : ""}
                    {likeSum === 1 ? <p><b>{likeSum} Like</b></p> : ""}
                    {/* COMMENTS LIST FOR POST */}
                    {commentsLength > 1 ? <h6>{commentsLength} comments</h6> : ""}
                    {commentsLength === 1 ? <h6>{commentsLength} comment</h6> : ""}
                  </div>
                  <ul className={commentListStyle}>{commentList}</ul>

                  {/* FOR COMMENTING */}
                  <textarea
                    value={value}
                    onChange={(event) => {setValue(event.target.value);}} 
                    rows="2" cols="80" placeholder="Leave a comment here.."
                  ></textarea>
                  {/* <div className={commentButton}> */}
                  <div className={commentButton}onClick={() => onSave()}>Comment</div>
                  {/* </div> */}
                </CardBody>
              </Card>
            </div>
          );
        }}
      </ContextConsumer>
    </>
  );
}
