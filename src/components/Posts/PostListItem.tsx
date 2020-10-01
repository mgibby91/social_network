import React, {useRef} from "react";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody } from "@paljs/ui/Card";
import { Link } from "@reach/router";
import { Button } from "@paljs/ui/Button";
import ContextConsumer from "../../context/context";
import './PostListItem.scss'
const classNames = require('class-names');

interface IProps {
  key: number;
  post: IPost;
  likes: ILikes
  active: boolean;
  comments: IComments;
  comment: object;
  addLike: (post_id: number, liker_id: number) => void;
  onClick: () => void
  id: number
  data: any
}

interface IComments {
  [index: number]: { id: number, user_id: number, name: string }
}

interface ILikes {
  [index: number]: { id: number, user_id: number, name: string } 
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
  id: number
}

export default function PostListItem(props: IProps) 
{  
  const list = classNames("post_body__item-list")
  const commentStyle = classNames("post_body__item-comments")

  const stack = props.post.stack.map((tech_stack, index) => {
    return <li className={list} key={index}>{tech_stack}</li>;
  });
  
  const commentData = props.comments.filter(comment => {
    if (props.post.post_id === comment.post_id) {
      return comment
    }
  })

  const commentList = commentData.map(comment => {
    console.log("comment avatar: ", comment.avatar);
    return (
      
      <div>
        <img src={comment.avatar} alt="avatar"/>
        <p className={commentStyle}><b>{comment.username}</b></p>
        <li className={commentStyle} >{comment.text_body}</li>
      </div>
    )
  })

  const likesData = props.likes.filter(like => {
    if (props.post.post_id === like.post_id) {
      return like.sum
    }
  })


  const likes = likesData.map(like => {
    return like.sum
  })

  console.log("likes: ", likes[0]);
  
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };

  return (
    <>
    <ContextConsumer>
      {({ data }) => {
        console.log("data in context: ", data);
        const postBody = classNames("post_body")
        const userLink = classNames("post_body__item-user_link")
        const messageButton = classNames("post_body__item-message_button");
        const commentListStyle = classNames("post_body__item-comment_list");
        const commentButton = classNames("post_body__item-comment_button")
        return (
          <div>
            <Row>
              <Col breakPoint={{ xs: 12 }}>
                <Card>
                  <CardBody className={postBody}>
                    {/* USERS DETAILS */}
                    <Link className={userLink} to={`/user-profiles/${props.post.username}`}>
                      <h3>{props.post.username}</h3>
                      <span>{props.active ? 
                        <h6>User is online</h6>
                      : <h6>User is offline</h6>}</span>
                      <img src={props.post.avatar} alt="avatar"></img>
                    </Link>
                    {/* POST TEXT BODY */}
                      <p>{props.post.text_body}</p>
                    {/* MESSAGE BUTTON */}
                    <div className={messageButton}>
                    <Link
                      to={`/messages/`}
                      state={{username: props.post.username}}  
                    >
                      <Button >Message User</Button>
                    </Link>
                    </div>
                    {/* POST STACK LIST */}
                    <h5>Stack: {stack}</h5>
                    {/* BUTTON FOR LIKES */}
                    <Button
                      onClick={() => console.log("post id in item: ", props.post.post_id, "id in props in item: ", props)}
                      >Like</Button>
                    {/* LIKE COUNT */}
                    <p><b>{likes[0]} likes</b></p>
                    {/* COMMENTS LIST FOR POST */}
                    <h6>Comments:</h6>
                    {/* <div className={commentListStyle}> */}
                      <ul className={commentListStyle}>{commentList}</ul>
                    {/* </div> */}
                    {/* FOR COMMENTING */}

                    <textarea 
                      ref={inputEl} 
                      rows="2" 
                      cols="80"
                      placeholder="Leave a comment here.."></textarea> 
                    <div className={commentButton}>
                    <Button onClick={onButtonClick}>Comment</Button>

                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        )
      }}
    </ContextConsumer>
    </>
  );
}
