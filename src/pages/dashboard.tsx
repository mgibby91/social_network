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
  users: IUsers;
}

interface IUsers {
  [index: number]: { id: number; user_id: number; name: string };
}

export default function Home() {
  const { state, createPost, addLike, createComment } = useApplicationData();

  const dashPosts = getDashboardPosts(state.posts);
  // console.log("dashposts in dash: ", dashPosts);
  const comments = state.comments;
  const likes = state.likes;
  const users = state.users;
  return (
    <div className="App">
      <Row>
        <Editor createPost={createPost} suggestion={state.stack_preferences} />
      </Row>
      <PostList
        users ={users} 
        posts={dashPosts} 
        comments={comments}
        likes={likes}
        addLike={addLike}
        createComment={createComment}
      />
    </div>
  );
}
