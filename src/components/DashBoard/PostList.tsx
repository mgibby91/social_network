import React, { useEffect, useState } from "react";
import PostListItem from "./PostListItem";
import axios from "axios";

export default function PostList(props) {
  const postData = props.posts.map((post, index) => {
    return <PostListItem key={index} post={post} />;
  });

  return (
    <div>
      <section>
        <h1>Feed</h1>
        <ul>{postData}</ul>
      </section>
    </div>
  );
}
