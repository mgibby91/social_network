import React from "react";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody, CardHeader, CardFooter } from "@paljs/ui/Card";
import timeSince from "../../helpers/timeSince";
import CommentList from "../Comments/CommentListItem";
import PostListItem from "./PostListItem";

function PostList(props) {
  const { comments, posts, updatePost, deletePost } = props;
  //console.log("from post list", comments, posts);
  const postData = posts.map((post, index) => {
    return (
      <PostListItem
        index={index}
        comments={comments}
        post={post}
        users={props.users}
        createComment={props.createComment}
        updatePost={updatePost}
        deletePost={deletePost}
      />
    );
  });
  return <Row>{postData}</Row>;
}

export default PostList;
