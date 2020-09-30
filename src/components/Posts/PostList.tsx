import React from "react";
import PostListItem from "./PostListItem";
import CommentListItem from '../Comments/CommentList'
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
  console.log("comments in list: ", comments);
  
  const postData = props.posts.map((post, index) => {

      return <PostListItem 
                key={index} 
                post={post}
                comments={comments}
             />;
    // })
  });
  console.log("comments in post list: ", props.comments);
  
  return (
    <div>
      <section>
        <h1>Feed</h1>
        <ul>{postData}</ul>
        <CommentListItem>

        </CommentListItem>
      </section>
    </div>
  );
}
