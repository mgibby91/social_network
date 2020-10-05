import React, { useState } from "react";
import timeSince from "../../helpers/timeSince";
import { Card, CardBody } from "@paljs/ui/Card";
import { Button } from "@paljs/ui/Button";
import Tags from "./MentorStack";

function EditPostItem(props) {
  //console.log("from edit post", props);
  const [post, setPost] = useState(props.text_body || "");
  let techTags = [];
  const onChangeInput = (selectedTags) => {
    techTags = selectedTags;
  };

  function onSave() {
    // const oldStack = props.mentor_stack.map((val) => {
    //   return val["name"];
    // });
    // const newStack = techTags.map((val) => {
    //   return val["name"];
    // });

    // //removed from the list
    // const removed = oldStack.filter((x) => !newStack.includes(x));
    // //added to the list
    // const added = newStack.filter((x) => !oldStack.includes(x));
    // if (removed.length !== 0 || added.length !== 0) {
    //   props.onSaveNewStack(removed, added, props.user.id);
    // }

    // console.log("new stack?", oldStack, newStack, removed, added);
    props.updatePost(post, props.id, props.user.id);
    props.onSaveEdit();
    // props.onSave();
  }
  return (
    <CardBody>
      <Button onClick={onSave}>Save Changes</Button>
      <p>EDITING</p>
      <p className="time-posted">{timeSince(props.time_posted)} </p>
      <textarea
        type="text"
        value={post}
        onChange={(event) => setPost(event.target.value)}
        placeholder="Round border"
      />
      <ul className="post-stack">
        <span className="bold">Stack:</span>
        {props.stack.map((tech_stack, idx) => {
          return <li key={idx}>{tech_stack}</li>;
        })}
      </ul>
      {/* <Tags
        tags={props.stack}
        onChange={onChangeInput}
        suggested={props.suggestion}
      /> */}
    </CardBody>
  );
}

export default EditPostItem;
