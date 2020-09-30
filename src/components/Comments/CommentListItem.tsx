import React from "react";
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Card, CardBody } from '@paljs/ui/Card';
import {
  Link,
} from "@reach/router";

interface IProps {
	key: number,
	comment: IComment
}

interface IComment {
	avatar: string,
	studentrating: string,
	text_body: string, 
	active: boolean,
	time_posted: Date,
	username: string,
}

export default function CommentListItem(props: IProps) {

	console.log("props in list item: ", props);
	
  return (
		<div>
			<Row>
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <CardBody>
								<Link to={`/user-profiles/${props.comment.username}`}>
									<h3>{props.comment.username}</h3>
									<img src={props.comment.avatar} alt="avatar"></img>
								</Link>
								<div>
                {props.active ? 
                  <h6>User is online</h6>
                : <h6>User is offline</h6>}
                </div>
								 <Card>
									<p>{props.comment.text_body}</p>
								</Card>
            </CardBody>
          </Card>
        </Col>
      </Row>
		</div>
  );
}