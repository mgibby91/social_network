import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Checkbox } from "@paljs/ui/Checkbox";
import { Button, ButtonLink } from "@paljs/ui/Button";
import ReactTags from "react-tag-autocomplete";

import Col from "@paljs/ui/Col";

function Editor(props) {
  const [value, setValue] = React.useState("**Hello world!!!**");
  const [checkbox, setCheckbox] = React.useState({
    1: false,
  });

  const [state, setState] = React.useState({
    tags: [
      { id: 1, name: "Apples" },
      { id: 2, name: "Pears" },
    ],
    suggestions: [
      { id: 3, name: "Bananas" },
      { id: 4, name: "Mangos" },
      { id: 5, name: "Lemons" },
      { id: 6, name: "Apricots" },
    ],
  });

  const onChangeCheckbox = (value: boolean, name: number) => {
    setCheckbox({ ...checkbox, [name]: value });
  };

  const onDelete = (i) => {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  };

  const onAddition = (tag) => {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
  };

  const postObj = {
    text: value,
    mentor: checkbox[1],
  };

  const onSave = () => {
    props.createPost(postObj);
    setValue("");
  };
  return (
    <>
      <MDEditor value={value} onChange={setValue} />
      <ReactTags
        ref={reactTags}
        tags={state.tags}
        suggestions={state.suggestions}
        onDelete={onDelete.bind(this)}
        onAddition={onAddition.bind(this)}
      />
      <Checkbox
        checked={checkbox[1]}
        status="Success"
        onChange={(value) => onChangeCheckbox(value, 1)}
      >
        Mentor Help Needed
      </Checkbox>
      <Col key={1} offset={{ xs: 11 - 1 }} breakPoint={{ xs: 1 + 1 }}>
        <Button
          fullWidth
          appearance="hero"
          status="Success"
          onClick={() => onSave()}
        >
          Post
        </Button>
      </Col>
    </>
  );
}

export default Editor;
