import React, { useState } from "react";
import Row from "@paljs/ui/Row";
import PostList from "../components/Posts/PostList";
import Editor from "../components/Posts/Editor";
import useApplicationData from "../hooks/useApplicationData";
import { getDashboardPosts } from "../helpers/profileHelpers";

interface IProps {
  value: object;
  submitPost: (username: string) => void;
  username: "string";
  onChange: void;
}

export default function Home() {
  const { state, createPost, addLike } = useApplicationData();

  const dashPosts = getDashboardPosts(state.posts);
  // console.log("dashposts in dash: ", dashPosts);
  const comments = state.comments;
  const likes = state.likes;
  return (
    <div className="App">
      <Row>
        <Editor createPost={createPost} suggestion={state.stack_preferences} />
      </Row>
      <PostList 
        posts={dashPosts} 
        comments={comments}
        likes={likes}
        addLike={addLike}
      />
    </div>
  );
}
