import React, { useState } from "react";
import PostList from "../components/DashBoard/PostList";
import axios from "axios";
import PostTextArea from "../components/DashBoard/PostTextArea";
import Row from "@paljs/ui/Row";
import PostList from "../components/DashBoard/PostList";
import Editor from "../components/Dashboard/Editor";

import useApplicationData from "../hooks/useApplicationData";
import { create } from "domain";
import { getDashboardPosts } from "../helpers/profileHelpers";

interface IProps {
  value: object;
  submitPost: (username: string) => void;
  username: "string";
  onChange: void;
}

export default function Home() {
  const { state, createPost } = useApplicationData();
  const dashPosts = getDashboardPosts(state.posts);

  return (
    <div className="App">
      <Row>
        <Editor createPost={createPost} />
      </Row>
      <PostList posts={dashPosts} />
    </div>
  );
}
