import React from "react";

function CommentList(props) {
  const { index, avatar, username, text_body } = props;
  return (
    <div key={index}>
      <img src={avatar} alt="avatar" />
      <div>
        <p>
          <b>{username}</b>
        </p>
        <li>{text_body}</li>
      </div>
    </div>
  );
}

export default CommentList;
