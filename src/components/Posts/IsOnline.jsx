import "./PostListItem.scss";
import React from 'react';
import Link from '@reach/router'

const classNames = require("class-names");
const userLink = classNames("post_body__item-user_link");

const IsOnline = (props) => {
	return (
	<Link
		className={userLink}
		to={`/user-profiles/${props.post.username}`}
	>
		<div>
			<span>
				{props.post.active ? (
					<h6>User is online</h6>
				) : (
					<h6>User is offline</h6>
				)}
			</span>
		</div>
	</Link>

	);
	
};

export default IsOnline;