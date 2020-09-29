import React, { useState, useEffect } from "react";
import axios from "axios";

import Row from "@paljs/ui/Row";
import PostList from "../components/DashBoard/PostList";
import Editor from "../components/Dashboard/Editor";

import useApplicationData from "../hooks/useApplicationData";
import { create } from "domain";

interface IProps {
  value: object;
  submitPost: (username: string) => void;
  username: "string";
  onChange: void;
}

export default function Home() {
  const { state, createPost } = useApplicationData();

  return (
    <div className="App">
      <Row>
        <Editor createPost={createPost} />
      </Row>
      <PostList posts={state.posts} />
    </div>
  );
}
