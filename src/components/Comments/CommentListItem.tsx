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

	// console.log("props in list item: ", props);
	
  return (
		<div>
			<Row>
        <Col breakPoint={{ xs: 12 }}>
					<Link to={`/user-profiles/${props.comment.username}`}>
						{/* <img src={props.comment.avatar} alt="avatar"></img> */}
						<p><b>{props.comment.username}</b></p>
					</Link>
					{/* <div>
					{props.active ? 
						<p>User is online</p>
					: <p>User is offline</p>}
					</div> */}
						<Card>
						<p>{props.comment.text_body}</p>
					</Card>
        </Col>
      </Row>
		</div>
  );
}