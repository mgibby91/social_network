import React from "react";
import PostListItem from "./PostListItem";

interface IProps {
  comments: IComments;
  posts: IPosts;
  likes: ILikes;
  addLike: (post_id: number, liker_id: number) => void;
  users: IUsers;
  createComment: (
    post_id: number,
    commenter_id: number,
    text_body: string
  ) => void;
}

interface IUsers {
  [index: number]: { id: number; user_id: number; name: string };
}
interface IComments {
  [index: number]: { id: number; user_id: number; name: string };
}

interface IPosts {
  [index: number]: { id: number; user_id: number; name: string };
}

interface ILikes {
  [index: number]: { id: number; user_id: number; name: string };
}

export default function PostList(props: IProps) {
  const comments = props.comments;
  const likes = props.likes;
  const postData = props.posts.map((post, index) => {
    return (
      <PostListItem
        key={index}
        post={post}
        comments={comments}
        likes={likes}
        addLike={props.addLike}
        createComment={props.createComment}
        users={props.users}
      />
    );
    // })
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
