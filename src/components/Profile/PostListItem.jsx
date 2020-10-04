import React from "react";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";
import timeSince from "../../helpers/timeSince";

function PostListItem(props) {
  const commentData = props.comments.filter((comment) => {
    if (props.post.post_id === comment.post_id) {
      return comment;
    }
  });

  // const commentList = commentData.map((comment, index) => {
  //   return (
  //     <div key={index}>
  //       <img className={commentAvatar} src={comment.avatar} alt="avatar" />
  //       <div className={commentStyle}>
  //         <p>
  //           <b>{comment.username}</b>
  //         </p>
  //         <li>{comment.text_body}</li>
  //       </div>
  //     </div>
  //   );
  // });

  return (
    <Col className="post" key={index} breakPoint={{ xs: 12, md: 6 }}>
      <Card accent="Info">
        <CardBody>
          <p className="time-posted">{timeSince(post.time_posted)} </p>
          <p className="post-body">{post.text_body}</p>
          <ul className="post-stack">
            <span className="bold">Stack:</span>
            {post.stack.map((tech_stack, idx) => {
              return <li key={idx}>{tech_stack}</li>;
            })}
          </ul>
        </CardBody>
      </Card>
    </Col>
  );
}

export default PostListItem;
