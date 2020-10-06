import React from "react";
import { Button } from "@paljs/ui/Button";

function CommentForm(props) {
  const [value, setValue] = React.useState("Comment here...");

  return (
    <>
      <textarea
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        rows="2"
        cols="80"
        placeholder="Leave a comment here.."
      ></textarea>
      <div>
        <Button onClick={() => props.onSave()}>Comment</Button>
      </div>
    </>
  );
}

export default CommentForm;
