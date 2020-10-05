import React from "react";
import ContextConsumer from "../../context/context";
import "./PostListItem.scss";
import timeSince from "../../helpers/timeSince";

const classNames = require("class-names");

interface IProps {
  key: number;
  post: IPost;
  likes: ILikes;
  active: boolean;
  comments: IComments;
  comment: object;
  addLike: (post_id: number, liker_id: number) => void;
  removeLike: (post_id: number, liker_id: number) => void;
  onClick: () => void;
  id: number;
  data: any;
  users: IUsers;
  createComment: (
    post_id: number,
    commenter_id: number,
    text_body: string,
    comment_details: (avatar: any, username: any) => void
  ) => void;
  removeComment: (
    post_id: number,
    commenter_id: number,
    text_body: string
  ) => void;
  editComment: (
    post_id: number,
    commenter_id: number,
    text_body: string,
    value: string
  ) => void;
  onChange: () => void;
  then: () => void;
}

interface IUsers {
  [index: number]: { id: number; user_id: number; name: string };
}

interface IComments {
  [index: number]: { id: number; user_id: number; name: string, post_id: number, text_body: string };
}

interface ILikes {
  [index: number]: { id: number; user_id: number; name: string };
}

interface IPost {
  avatar: string;
  studentrating: string;
  text_body: string;
  active: boolean;
  time_posted: Date;
  stack: any;
  username: string;
  post_id: number;
  id: number;
  owner_id: number;
}

const commentStyle = classNames("post_body__item-comments");
const commentAvatar = classNames("post_body__item-comment_avatar");
const deleteButton = classNames("post_body__item-delete_button");
const inline = classNames("post_body__item-inline");



export default function CommentListItem(props: IProps) {
  const [value, setValue] = React.useState("Comment here...");


  const postComments = props.comments.filter((comment) => {
    if (props.post.post_id === comment.post_id) {
      return true;
    }
  });

  return (
    <>
      <ContextConsumer>
        {({ data }) => {
          if (!data.state) return null;
          const currentUser = props.users.find(
            (user) => user.id === data.selected
          );
          
          const commentList = postComments.map((comment, index) => {

          const myComment = currentUser.id === comment.commenter_id;

          const myCommentOrPost = currentUser.id === comment.commenter_id || currentUser.id === props.post.owner_id ;
            
          const onEdit = () => {
            //check for empty input here
            props.editComment(props.comment.post_id, currentUser.id, value, props.comment.text_body);
          };

          const onRemove = () => {
            //check for empty input here
            props.removeComment(props.post.post_id, currentUser.id, value);
          };
          
          return (
						// COMMENT LIST
            <div key={index}>
              <img
                className={commentAvatar}
                src={comment.avatar}
                alt="avatar"
              />
              <div className={commentStyle}>
                <div className={inline}>
                  {myComment ? (
                    <p onClick={() => onRemove()} className={deleteButton}>
                      Edit
                    </p>
                  ) : (
                    ""
                  )}
                  {myCommentOrPost ? (
                    <p onClick={() => onEdit()} className={deleteButton}>
                      Delete
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <li>
                  <b>{comment.username}</b>
                </li>
                <li>{comment.text_body}</li>
              </div>
            </div>
          );
				});
				const commentsLength = commentList.length;
				const commentObj = {
					avatar: currentUser.avatar,
					username: currentUser.username,
				};
				// FOR COMMENTS
				const onSave = () => {
					//check for empty input here
					console.log("props post id: ", props.post.post_id);
					
					props
						.createComment(
							props.post.post_id,
							currentUser.id,
							value,
							commentObj
						)
						.then(() => {
							setValue("");
						});
				};
        }}
      </ContextConsumer>
    </>
  );
}
