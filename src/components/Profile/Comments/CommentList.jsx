import React from "react";

function CommentList(props) {
  const { index, avatar, username, text_body } = props;
  return (
    <div className="profile-comment" key={index}>
      <img src={avatar} alt="avatar" />
      <div>
        <div>
          <b>{username} commented:</b>
        </div>
        <div className="text-body">{text_body}</div>
      </div>
    </div>
  );
}

export default CommentList;
