import React from "react";
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Card, CardBody } from '@paljs/ui/Card';
import {
  Link,
} from "@reach/router";

interface IProps {
  key: number;
  post: IPost;
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

export default function PostListItem(props: IProps) {
<<<<<<< HEAD
  const stack = props.post.stack.map((tech_stack) => {
    return <li>{tech_stack}</li>;
  });
=======
console.log("props in post item: ", props);

>>>>>>> c06173b630f4a595a2b2aefd5080542a9f721be0
  return (
    <div>
      <Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <CardBody>
<<<<<<< HEAD
              <h3>{props.post.username}</h3>
              <img src={props.post.avatar} alt="avatar"></img>
              <Card>
                <p>{props.post.text_body}</p>
                <ul>{stack}</ul>
              </Card>
=======
								<Link to={`/user-profiles/${props.post.username}`}>
									<h3>{props.post.username}</h3>
									<img src={props.post.avatar} alt="avatar"></img>
								</Link>
								<Card>
									<p>{props.post.text_body}</p>
								</Card>
>>>>>>> c06173b630f4a595a2b2aefd5080542a9f721be0
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
