import React from "react";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";

function PostList(props) {
  // console.log("from posts:", props.posts);
  const postData = props.posts.map((post, index) => {

    return (
      <Col key={index} breakPoint={{ xs: 12, md: 6 }}>
        <Card accent="Info">
          <CardBody>
            <p>{post.time_posted} </p>
            <p>{post.text_body}</p>
            <ul>
              {post.stack.map((tech_stack, idx) => {
                return <li key={idx}>{tech_stack}</li>;
              })}
            </ul>
          </CardBody>
        </Card>
      </Col>
    );
  });
  return <Row>{postData}</Row>;
}

export default PostList;
