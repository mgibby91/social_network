import React from "react";
import { Button } from "@paljs/ui/Button";

function CommentForm(props) {
  const [value, setValue] = React.useState("Comment here...");

  return (
    <>
      <textarea
        className="profile-new-comment"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        rows="2"
        cols="80"
        placeholder="Leave a comment here.."
      ></textarea>
      <div>
        <button
          className="blue-button blue-button-transition"
          onClick={() => props.onSave()}
        >
          Comment
        </button>
      </div>
    </>
  );
}

export default CommentForm;
