import React from "react";
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Card, CardBody } from '@paljs/ui/Card';
import {
  Link,
} from "@reach/router";

interface IProps {
	key: number,
	post: IPost
}

interface IPost {
	avatar: string,
	studentrating: string,
	text_body: string, 
	active: boolean,
	time_posted: Date,
	username: string
}

export default function PostListItem(props: IProps) {

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