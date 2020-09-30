import React from "react";
import PostListItem from "./PostListItem";

interface IProps {
  comments: IComments
  posts: IPosts
}

interface IComments {
  [index: number]: { id: number, user_id: number, name: string }
}

interface IPosts {
  [index: number]: { id: number, user_id: number, name: string }
}

export default function PostList(props: IProps) {
  console.log("props: ", props);
  
  const comments = props.comments;

  const postData = props.posts.map((post, index) => {
    // props.comments.map((comment, index) => {
    //   let commentArr = []
    //   if (post.post_id === comment.post_id)
    //   commentArr.push(comment)
      return <PostListItem 
                key={index} 
                post={post} 
                comment={comments}
             />;
    // })
  });
  console.log("comments in post list: ", props.comments);
  
  return (
    <div>
      <section>
        <h1>Feed</h1>
        <ul>{postData}</ul>
      </section>
    </div>
  );
}
