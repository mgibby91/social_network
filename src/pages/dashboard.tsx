import React, { useState } from "react";
import Row from "@paljs/ui/Row";
import PostList from "../components/Posts/PostList";
import Editor from "../components/Posts/Editor";
import useApplicationData from "../hooks/useApplicationData";
import ContextConsumer from "../context/context";
import NewLogin from './login'
import { getDashboardPosts } from "../helpers/profileHelpers";
import { Router } from '@reach/router';

import './dashboard.scss'
import {Route} from "react-router-dom";
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
    deletePost,
  } = useApplicationData();

  let dashPosts = getDashboardPosts(state.posts);
  // const filterOptions = getFilterOptions(state.posts);

  // useEffect(() => {
  //   setOptions(filterOptions);
  // }, []);
  function filterPost(filter) {
    // if (filter !== "") {
    filterDashboardPosts(filter);
    // dashPosts = getDashboardPosts(state.filtered_posts);
    //}
  }
  // dashPosts = state.filtered_posts;
  // console.log("dashposts in dash: ", dashPosts);
  const comments = state.comments;
  const likes = state.likes;
  const users = state.users;
  return (
    <ContextConsumer>
      {({ data }) => {
      if (!data.state && !data.selected) return (
          <NewLogin></NewLogin>
      )
        return (
          <div className="dashboard-page">
            <div className="App">
              <h1 className="title">Looking for help or have something to offer? Let others know!</h1>
              <Row>
                <Editor
                  createPost={createPost}
                  suggestion={state.stack_preferences}
                  users={users}
                />
              </Row>
              <Row className="filter-btns">
                <div className="filter-btn filter-btn-all" onClick={() => filterPost("")}>All</div>
                <div className="filter-btn filter-btn-css" onClick={() => filterPost("CSS")}>CSS</div>

                <div className="filter-btn filter-btn-ruby" onClick={() => filterPost("Ruby")}>Ruby</div>
                <div className="filter-btn filter-btn-javascript" onClick={() => filterPost("Javascript")}>
                  Javascript
                </div>
              </Row>
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
                deletePost={deletePost}
              />
            </div>
          </div>
        );
      }}
    </ContextConsumer>
  );
}
