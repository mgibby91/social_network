import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import ReactTags from "react-tag-autocomplete";

function Tags(props) {
  const [tags, setTags] = useState([
    { id: 1, name: "Apples" },
    { id: 2, name: "Pears" },
  ]);
  const [suggestions, setSuggestions] = useState([
    { id: 3, name: "Bananas" },
    { id: 4, name: "Mangos" },
    { id: 5, name: "Lemons" },
    { id: 6, name: "Apricots" },
  ]);

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
