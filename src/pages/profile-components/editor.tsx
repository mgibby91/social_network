import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Tabs, Tab } from "@paljs/ui/Tabs";
import { Checkbox } from "@paljs/ui/Checkbox";
import { Button, ButtonLink } from "@paljs/ui/Button";
import Col from "@paljs/ui/Col";

function Editor() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  const [checkbox, setCheckbox] = React.useState({
    1: false,
    2: false,
    3: false,
  });

  const onChangeCheckbox = (value: boolean, name: number) => {
    setCheckbox({ ...checkbox, [name]: value });
  };
  return (
    <>
      <Tabs activeIndex={0} fullWidth>
        <Tab title="Editor" icon="icon ion-ios-home" responsive>
          <MDEditor value={value} onChange={setValue} />
        </Tab>
        <Tab title="Preview" icon="icon ion-ios-star-outline" responsive>
          <MDEditor.Markdown source={value} />
        </Tab>
      </Tabs>
      <Checkbox
        checked={checkbox[1]}
        status="Success"
        onChange={(value) => onChangeCheckbox(value, 1)}
      >
        Mentor Help Needed
      </Checkbox>
      <Col key={1} offset={{ xs: 11 - 1 }} breakPoint={{ xs: 1 + 1 }}>
        <Button fullWidth appearance="hero" status="Success">
          Post
        </Button>
      </Col>
    </>
  );
}

export default Editor;
