import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Checkbox } from "@paljs/ui/Checkbox";
import { Button, ButtonLink } from "@paljs/ui/Button";
import Tags from "./StackTag";

import Col from "@paljs/ui/Col";

function Editor(props) {
  // console.log("from editor", props.stack);
  const [value, setValue] = React.useState("**Hello world!!!**");
  const [checkbox, setCheckbox] = React.useState({
    1: false,
  });

  const onChangeCheckbox = (value: boolean, name: number) => {
    setCheckbox({ ...checkbox, [name]: value });
  };

  const postObj = {
    text: value,
    mentor: checkbox[1],
  };

  let techTags = [];
  const onChangeInput = (selectedTags) => {
    techTags = selectedTags;
  };

  const onSave = () => {
    //check for empty input here

    console.log("from editor", techTags);
    props.createPost(postObj, techTags, props.id).then(() => {
      setValue("");
    });
  };

  return (
    <>
      <MDEditor value={value} onChange={setValue} />
      <Tags suggested={props.suggestion} onChange={onChangeInput} />
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
