import React from "react";
import PostList from "../components/Posts/PostList";
import Editor from "../components/Posts/Editor";
import useApplicationData from "../hooks/useApplicationData";
import { getDashboardPosts } from "../helpers/profileHelpers";
import ContextConsumer from '../context/context'
import NewLogin from '../components/LoginLogout/NewLogin'

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
  const { state, createPost, addLike, createComment, removeLike, removeComment, editComment } = useApplicationData();

  const dashPosts = getDashboardPosts(state.posts);
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
        <div className="App">
          <h1>Request or offer assistance:</h1>
          <Editor 
            createPost={createPost} 
            suggestion={state.stack_preferences} 
            users={users}
          />
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
