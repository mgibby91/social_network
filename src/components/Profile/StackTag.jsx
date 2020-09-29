import React, { useState, useRef } from "react";
import ReactTags from "react-tag-autocomplete";

function Tags(props) {
  // console.log("tags", props.suggested);
  const [tags, setTags] = useState([
    {
      id: 1,
      name: "Emily",
    },
  ]);
  const [suggestions, setSuggestions] = useState(props.suggested);

  const reactTags = useRef(null);

  const onDelete = (i) => {
    console.log("on delete", i);
    let tag = tags.slice(0);
    tag.splice(i, 1);

    setTags(tag);
    console.log("on slice", tags, tag, tag.splice(i, 1));
  };

  const onAddition = (tag) => {
    setTags([...tags, tag]);
  };

  return (
    <ReactTags
      ref={reactTags}
      tags={tags}
      suggestions={suggestions}
      onDelete={onDelete}
      onAddition={onAddition}
    />
  );
}

export default Tags;
// ReactDOM.render(<App />, document.getElementById("app"));
