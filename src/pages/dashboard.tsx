import React, { useState, useEffect } from "react";
import Row from "@paljs/ui/Row";
import PostList from "../components/Posts/PostList";
import Editor from "../components/Posts/Editor";
import Select from "react-dropdown-select";
import useApplicationData from "../hooks/useApplicationData";
import { Button } from "@paljs/ui/Button";
import { getDashboardPosts, getFilterOptions } from "../helpers/profileHelpers";

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

  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("Filter by");

  const dashPosts = getDashboardPosts(state.posts);
  const filterOptions = getFilterOptions(state.posts);

  // useEffect(() => {
  //   setOptions(filterOptions);
  // }, []);

  // console.log("dashposts in dash: ", dashPosts);
  const comments = state.comments;
  const likes = state.likes;
  const users = state.users;
  return (
    <div className="App">
      <Row>
        <Editor createPost={createPost} suggestion={state.stack_preferences} />
      </Row>
      <Row>
        {/* <Button onClick={() => filterDashboardPosts("CSS")}>CSS</Button> */}

        {/* <Select options={options} onChange={() => setValue(value)} /> */}
      </Row>
      <PostList
        users={users}
        posts={dashPosts}
        comments={comments}
        likes={likes}
        addLike={addLike}
        createComment={createComment}
      />
    </div>
  );
}
