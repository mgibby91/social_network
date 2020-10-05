import React, { useState, useEffect } from "react";
import Row from "@paljs/ui/Row";
import PostList from "../components/Posts/PostList";
import Editor from "../components/Posts/Editor";
import Select from "react-dropdown-select";
import useApplicationData from "../hooks/useApplicationData";
import ContextConsumer from "../context/context";
import LoginLogout from "../components/LoginLogout/LoginLogout";
import Register from "../components/LoginLogout/Register";
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
  const {
    state,
    createPost,
    addLike,
    createComment,
    removeLike,
    removeComment,
    editComment,
    filterDashboardPosts,
  } = useApplicationData();

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
    <ContextConsumer>
      {({ data }) => {
        if (!data.state && !data.selected)
          return (
            <div>
              <h1>Please login or register before using Stack.</h1>
              <LoginLogout></LoginLogout>
              <Register></Register>
            </div>
          );
        return (
          <div className="App">
            <h1>Request or offer assistance:</h1>
            <Row>
              <Editor
                createPost={createPost}
                suggestion={state.stack_preferences}
                users={users}
              />
            </Row>
            {/* <Row>
              <Button onClick={() => filterDashboardPosts("CSS")}>CSS</Button> 
            </Row> */}
            <PostList
              users={users}
              posts={dashPosts}
              comments={comments}
              likes={likes}
              addLike={addLike}
              removeLike={removeLike}
              createComment={createComment}
              removeComment={removeComment}
              editComment={editComment}
            />
          </div>
        );
      }}
    </ContextConsumer>
  );
}
