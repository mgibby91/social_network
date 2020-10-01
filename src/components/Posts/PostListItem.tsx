import React from "react";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody } from "@paljs/ui/Card";
import { Link } from "@reach/router";
import { Button } from "@paljs/ui/Button";

interface IProps {
  key: number;
  post: IPost;
  likes: ILikes
  active: boolean;
  comments: IComments;
  comment: object;
  addLike: (post_id: number, liker_id: number) => void;
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
}

export default function PostListItem(props: IProps) 
{  
console.log("props: ", props);

  const stack = props.post.stack.map((tech_stack, index) => {
    return <li key={index}>{tech_stack}</li>;
  });
  
  const commentData = props.comments.filter(comment => {
    if (props.post.post_id === comment.post_id) {
      return comment
    }
  })

  const commentList = commentData.map(comment => {

    return (
      <div>
        <p><b>{comment.username}</b></p>
        <li>{comment.text_body}</li>
      </div>
    )
  })
  console.log("comment: ", commentList);

  const likesData = props.likes.filter(like => {
    if (props.post.post_id === like.post_id) {
      return like.sum
    }
  })

  console.log("likes in post item: ", likesData);

  const likes = likesData.map(like => {
    return like.sum
  })

  console.log("likes: ", likes[0]);
  

  return (
    <div>
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <CardBody>
              <Link to={`/user-profiles/${props.post.username}`}>
                <h3>{props.post.username}</h3>
                <img src={props.post.avatar} alt="avatar"></img>
              </Link>
              <div>
                {props.active ? 
                  <h6>User is online</h6>
                : <h6>User is offline</h6>}
                </div>
              <Link 
                to={`/messages/`}
                state={{username: props.post.username}}  
              >
                <Button>Message User</Button>
              </Link>
              <Button
                onClick={props.addLike(props.post.id, props.id)}
              >Like</Button>
              <Button>Comment</Button>

                <h4>Stack: {stack}</h4>
              <Card>
                <p>{props.post.text_body}</p>
              </Card>
              <p><b>{likes[0]} likes</b></p>
              <ul>{commentList}</ul>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
