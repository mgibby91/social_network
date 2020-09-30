import React from "react";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody } from "@paljs/ui/Card";
import { Link } from "@reach/router";
import { Button } from "@paljs/ui/Button";

interface IProps {
  key: number;
  post: IPost;
  active: boolean;
  comments: IComments;
  comment: object;
}

interface IComments {
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
}

export default function PostListItem(props: IProps) 
{  

  const stack = props.post.stack.map((tech_stack, index) => {
    
    return <li key={index}>{tech_stack}</li>;
  });
  
  const comments = props.comment;
  console.log("comments in item: ", comments);
  
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
              <Button>Like</Button>
              <Button>Comment</Button>

                <h4>Stack: {stack}</h4>
              <Card>
                <p>{props.post.text_body}</p>
              </Card>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
